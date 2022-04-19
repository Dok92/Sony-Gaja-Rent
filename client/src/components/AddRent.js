import {React, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Alert from './Alert'
import FormRowSelect from './FormRowSelect'
import FormRow from './FormRow'
import { useAppContext } from '../context/appContext'



const AddRent = () => {
  const {
    // isLoading,
    // isEditing,
    showAlert,
    displayAlert,
    // position,
    // company,
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
    note,
    price,
    handleChange,
    // clearValues,
    createRent,
    // editRent,
  } = useAppContext()

  let location = useLocation().pathname;

  useEffect(() => {
    handleChange({ name: 'console', value: location.split('/')[1] })
  })

  // TODO calculate price based on console, days, controllers and projector
  
// if (console === 'ps4') {
//   if (controllers == '2') {
//     const pricing = days
//   }
// }
  

const handleSubmit = (e) => {
  e.preventDefault()

  if (!days || !controllers || !rentLocation) {
    displayAlert()
    return
  }

  // const price = calculatePrice() 
  
  createRent()
}

const handleRentInput = (e) => {
  const name = e.target.name
  const value = e.target.value
  handleChange({name, value})
}

  return (    
    <form className='form-add-rent'>
    {showAlert && <Alert />}
    <div className='form-center'>  
      <FormRowSelect
        name='days'
        labelText='Broj dana'        
        value={days}
        handleChange={handleRentInput}
        list={location === '/ps4' ? daysOptionsPs4 : daysOptionsPs5}
      />
        <FormRowSelect
          name='controllers'
          labelText='Broj džojstika'
          value={controllers}
          handleChange={handleRentInput}
          list={controllersOptions}
        />
      <FormRowSelect
        name='rentLocation'
        labelText='Mesto'
        value={rentLocation}
        handleChange={handleRentInput}
        list={rentLocationOptions}
      />
      <FormRowSelect
        name='projector'
        labelText='Sa projektorom?'
        value={projector}
        handleChange={handleRentInput}
        list={projectorOptions}
      />
        <FormRow
        type='textarea'
        labelText='Napomena:'
        name='note'
        value={note}
        handleChange={handleRentInput}
      />
      <div className='btn-container'>
        <h4>Ukupno: </h4>
        <button
          type='submit'
          className='ps5-btn ps5-btn-lg ps5-btn-primary'
          onClick={handleSubmit}
          // disabled={isLoading}
        >
          Iznajmi
        </button>
      </div>
    </div>
  </form>     
  )
}
export default AddRent