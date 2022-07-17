import { React, useState, useEffect, useRef } from "react";
import { useAppContext } from "../../context/appContext";
import { useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";
import Alert from "../Alert";
import FormRow from "../FormRow";
import FormRowSelect from "../FormRowSelect";
import TrophyAlert from "../TrophyAlert";
import './AddRent.scss'

const AddRent = () => {
  const {
    showAlert,
    displayAlert, 
    trophyType, 
    console,
    days,
    daysOptionsPs4,
    daysOptionsPs5,
    controllers,
    controllersOptions,
    rentLocation,
    rentLocationOptions,
    projector,
    projectorOptions,
    phone,
    price,
    totalRents,
    handleChange,
    createRent,
    getRents,
    user
  } = useAppContext();

  const location = useLocation().pathname;  

  const [isTrophyActive, setIsTrophyActive] = useState();

  const form = useRef();

  useEffect(() => {
    const psPricing = () => {
      if (console === "ps4") {
        if (controllers === "2") {
          if (days === "1") {
            return 1300;
          } else if (days === "2") {
            return 2000;
          } else if (days === "3") {
            return 2800;
          } else if (days === "4") {
            return 3500;
          } else if (days === "5") {
            return 4300;
          } else if (days === "6") {
            return 5000;
          } else if (days === "7") {
            return 5500;
          }
        } else if (controllers === "4") {
          if (days === "1") {
            return 1500;
          } else if (days === "2") {
            return 2300;
          } else if (days === "3") {
            return 3300;
          } else if (days === "4") {
            return 4000;
          } else if (days === "5") {
            return 5000;
          } else if (days === "6") {
            return 5700;
          } else if (days === "7") {
            return 6500;
          }
        }
      } else if (console === "ps5") {
        if (controllers === "2") {
          if (days === "1") {
            return 2000;
          } else if (days === "2") {
            return 3400;
          } else if (days === "3") {
            return 4500;
          }
        } else if (controllers === "4") {
          if (days === "1") {
            return 2400;
          } else if (days === "2") {
            return 3800;
          } else if (days === "3") {
            return 4900;
          }
        }
      }
      return 0;
    };

    const projectorPricing = () => {
      if (projector === "1 dan") {
        return 1500;
      } else if (projector === "2 dana") {
        return 2500;
      } else if (projector === "3 dana") {
        return 3300;
      } else if (projector === "4 dana") {
        return 3900;
      }
      return 0;
    };

    const checkTrophy = () => {
      let type = "";
      let text = "";
      
      // check if next order should fire trophy alert
      // eslint-disable-next-line no-unused-expressions
      totalRents === 0 ? (type = "bronze", text = "Prva porudžbina") 
      : totalRents === 4 ? (type = "silver", text = "Peta porudžbina")
      : totalRents === 9 ? (type = "gold", text = "Deseta porudžbina")
      : totalRents === 10 ? (type = "platinum", text = "Preko 10 porudžbina")
      : {type: "", text: ""}
      
      return {type, text}    
    }

    const discount = () => {
      let discount

      totalRents === 1 ? discount = 0.8
       : totalRents === 5 ? discount = 0.5
       : totalRents === 10 ? discount = 0
       : totalRents > 10 ? discount = 0.9
       : discount = 1

      return discount
    }

    handleChange({ name: "console", value: location.split("/")[1] });
    handleChange({ name: "price", value: (psPricing() + projectorPricing()) * discount() });
    handleChange({ name: "trophyType", value: checkTrophy().type });
    handleChange({ name: "trophyText", value: checkTrophy().text });
  }, [console, controllers, days, location, projector, phone]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!days || !controllers || !rentLocation || !phone) {
      displayAlert();
      return;
    }
    
    // valid phone number format
    let regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g

    if (!regex.test(phone)) {
      createRent();
      return;
    }

    if (trophyType !== "") {      
    setIsTrophyActive("active");        
  }
    setTimeout(() => {
      setIsTrophyActive();
    }, 5000); 

    createRent(); 

    // Send email notification to admin 
    const templateParams = {
      email: user.email,
      name: user.name,
      console,
      controllers,
      days,
      rentLocation,
      projector,
      phone,
      price,
    };
    emailjs.send('service_2z0beii','template_hcw1z0c', templateParams, 'UDt6VBDiGKB9aIwhm')
    .then((response) => {
      window.console.log('SUCCESS!', response.status, response.text);
    }, (err) => {
      window.console.log('FAILED...', err);
    });
  };

  const handleRentInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  useEffect(() => { 
    getRents();
  }, [days]); 

  return (
    <>   
    <TrophyAlert isTrophyActive={isTrophyActive}/>
    <form ref={form} className='form-add-rent'>
      {showAlert && <Alert />}
      <div className='form-center'>
        <FormRowSelect
          name='days'
          labelText='Broj dana:'
          value={days}
          handleChange={handleRentInput}
          list={location === "/ps4" ? daysOptionsPs4 : daysOptionsPs5}
        />
        <FormRowSelect
          name='controllers'
          labelText='Broj džojstika:'
          value={controllers}
          handleChange={handleRentInput}
          list={controllersOptions}
        />
        <FormRowSelect
          name='rentLocation'
          labelText='Mesto:'
          value={rentLocation}
          handleChange={handleRentInput}
          list={rentLocationOptions}
        />
        <FormRowSelect
          name='projector'
          labelText='Sa projektorom:'
          value={projector}
          handleChange={handleRentInput}
          list={projectorOptions}
        />
          <FormRow
            labelText='Kontakt telefon:'
            name='phone'
            value={phone}
            handleChange={handleRentInput}
          />
        <div className='btn-container'>
          <h4>Iznos: {price} dinara</h4>
          <button
            type='submit'
            className='ps5-btn ps5-btn-lg ps5-btn-primary'
            onClick={handleSubmit}
          >
            Iznajmi
          </button>
        </div>
      </div>
    </form>
    </>
  );
};
export default AddRent;
