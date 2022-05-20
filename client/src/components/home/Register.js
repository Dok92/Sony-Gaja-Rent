import { useState } from "react";
import FormRow from "../FormRow";
import Alert from "../Alert";
import { useAppContext } from "../../context/appContext";
import "./Register.scss";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, displayAlert, setupUser } = useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }

    const currentUser = { name, email, password };

    if (isMember) {
      setupUser({ currentUser, endPoint: "login", alertText: "Ulogovani ste!" });
    } else {
      setupUser({ currentUser, endPoint: "register", alertText: "Uspešno kreiran nalog!" });
    }
  };

  return (
    <>
      <form className='form-register' onSubmit={onSubmit}>
        <h3>{values.isMember ? "Prijava" : "Registracija"}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            type='text'
            labelText={"Korisničko ime"}
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type='email'
          labelText={"Email"}
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type='password'
          labelText={"Lozinka"}
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
        <button type='submit' disabled={isLoading} className='ps5-btn ps5-btn-lg ps5-btn-register'>
          Prijavi se
        </button>
        <p>
          {values.isMember ? "Nemate nalog?" : "Već ste prijavljeni?"}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? "Registruj se" : "Uloguj se"}
          </button>
        </p>
      </form>
    </>
  );
};

export default Register;
