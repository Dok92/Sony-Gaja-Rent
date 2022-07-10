import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_RENT_BEGIN,
  CREATE_RENT_SUCCESS,
  CREATE_RENT_ERROR,
  GET_RENTS_BEGIN,
  GET_RENTS_SUCCESS,
  GET_TROPHY_RENTS_BEGIN,
  GET_TROPHY_RENTS_SUCCESS
} from './actions'

import { initialState } from './appContext'

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Molimo popunite sva polja!',
    }
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    }
  }
  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      rentLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    }
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    }
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      rentLocation: '',
      userLocation: '',
    }
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    }
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      days: '',
      controllers: '',
      rentLocation: '',
      projector: '',
      note: '',
      phone: ''
    }
    return {
      ...state,
      ...initialState,
    }
  }
  if (action.type === CREATE_RENT_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === CREATE_RENT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Postavljena porudžbina!',
    }
  }
  if (action.type === CREATE_RENT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  if (action.type === GET_RENTS_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === GET_RENTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      rents: action.payload.rents,
      totalRents: action.payload.totalRents,
      totalSpent: action.payload.totalSpent,
    }
  }
  if (action.type === GET_TROPHY_RENTS_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === GET_TROPHY_RENTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      trophyRents: action.payload.trophyRents
    }
  }
  throw new Error(`no such action : ${action.type}`)
}

export default reducer
