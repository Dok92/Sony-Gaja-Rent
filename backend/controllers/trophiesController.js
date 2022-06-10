import Rent from '../models/Rent.js'
import { StatusCodes } from 'http-status-codes'

const getTrophyRents = async (req, res) => {
  const queryObject = {
    createdBy: req.user.userId,
    // chek if trophy arr is not empty
    trophy: { $ne: "" }
  }

  let result = Rent.find(queryObject)
  const trophyRents = await result

  res.status(StatusCodes.OK).json({ trophyRents })
}


export { getTrophyRents }