import { React, useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { useLocation } from "react-router-dom";
import Alert from "../Alert";
import FormRow from "../FormRow";
import FormRowSelect from "../FormRowSelect";

const AddRent = () => {
  const {
    showAlert,
    displayAlert,
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
    note,
    price,
    handleChange,
    createRent,
  } = useAppContext();

  const location = useLocation().pathname;

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

    handleChange({ name: "console", value: location.split("/")[1] });
    handleChange({ name: "price", value: psPricing() + projectorPricing() });
  }, [console, controllers, days, handleChange, projector, location]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!days || !controllers || !rentLocation) {
      displayAlert();
      return;
    }
    createRent();
  };

  const handleRentInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <form className='form-add-rent'>
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
          <FormRow
            labelText='Napomena:'
            name='note'
            value={note}
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
  );
};
export default AddRent;
