import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_RENT_BEGIN,
  CREATE_RENT_SUCCESS,
  CREATE_RENT_ERROR,
  GET_RENTS_BEGIN,
  GET_RENTS_SUCCESS,
  SET_EDIT_RENT,
  DELETE_RENT_BEGIN,
  EDIT_RENT_BEGIN,
  EDIT_RENT_SUCCESS,
  EDIT_RENT_ERROR,
  // SHOW_STATS_BEGIN,
  // SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
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
      isLoading: true,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
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
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      rentLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'Profil ažuriran!',
    }
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
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
      // NOTE price?
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
    return { ...state, isLoading: true, showAlert: false }
  }
  if (action.type === GET_RENTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      rents: action.payload.rents,
      totalRents: action.payload.totalRents,
      // numOfPages: action.payload.numOfPages,
    }
  }
  if (action.type === SET_EDIT_RENT) {
    const rent = state.rents.find((rent) => rent._id === action.payload.id)
    const { _id, position, company, rentLocation, rentType, status } = rent
    return {
      ...state,
      isEditing: true,
      editRentId: _id,
      position,
      company,
      rentLocation,
      rentType,
      status,
    }
  }
  if (action.type === DELETE_RENT_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === EDIT_RENT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === EDIT_RENT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Rent Updated!',
    }
  }
  if (action.type === EDIT_RENT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  // if (action.type === SHOW_STATS_BEGIN) {
  //   return {
  //     ...state,
  //     isLoading: true,
  //     showAlert: false,
  //   }
  // }
  // if (action.type === SHOW_STATS_SUCCESS) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     stats: action.payload.stats,
  //     monthlyApplications: action.payload.monthlyApplications,
  //   }
  // }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: '',
      searchStatus: 'all',
      searchType: 'all',
      sort: 'novije',
    }
  }
  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page }
  }
  throw new Error(`no such action : ${action.type}`)
}

export default reducer
