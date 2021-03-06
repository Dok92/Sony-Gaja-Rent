import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import "express-async-errors";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Molimo popunite sva polja");
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email već postoji");
  }

  const user = await User.create({ name, email, password });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email
    },
    token
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Molimo popunite sva polja");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Netačni podaci");
  }

  const correctPassword = await user.comparePassword(password);
  if (!correctPassword) {
    throw new UnAuthenticatedError("Pogrešna lozinka");
  }

  const token = user.createJWT();

  user.password = undefined;

  res.status(StatusCodes.OK).json({ user, token });
};

export { register, login };
