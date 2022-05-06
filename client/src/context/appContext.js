import React, { useReducer, useContext } from 'react'

import reducer from './reducer'
import axios from 'axios'
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
  // SET_EDIT_RENT,
  // DELETE_RENT_BEGIN,
  // EDIT_RENT_BEGIN,
  // EDIT_RENT_SUCCESS,
  // EDIT_RENT_ERROR,
  // SHOW_STATS_BEGIN,
  // SHOW_STATS_SUCCESS,
  // CLEAR_FILTERS,
  CHANGE_PAGE,
} from './actions'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  // showSidebar: false,
  // isEditing: false,
  // editRentId: '',
  // position: '',
  // company: '',
  // jobLocation: userLocation || '',
  console: '',
  days: 0, // NOTE default for status options
  daysOptionsPs4: ['', 1, 2, 3, 4, 5, 6, 7], // statusOptions
  daysOptionsPs5: ['', 1, 2, 3], // statusOptions  
  controllers: 0,
  controllersOptions: ['', 2, 4],
  rentLocation: '', // NOTE default for location - old jobType
  rentLocationOptions: ['', 'Novi Sad', 'Veternik', 'Futog', 'Sremska Kamenica', 'Petrovaradin'], // jobTypeOptions
  projector: 'Ne',
  projectorOptions: ['Ne', '1 dan', '2 dana', '3 dana', '4 dana'], 
  phone: '',
  note: '',
  price: 0,
  rents: [],
  totalRents: 0,
  // numOfPages: 1,
  // page: 1,
  // stats: {},
  // monthlyApplications: [],
  // search: '',
  // searchConsole: 'sve',
  // searchType: 'all',
  sort: 'novije',
  sortOptions: ['novije', 'starije', 'cena niska', 'cena visoka'],
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // axios
  const authFetch = axios.create({
    baseURL: '/api/v1',
  })
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('location', location)
}

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('location')
  }

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)

      const { user, token, location } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      })
      addUserToLocalStorage({ user, token, location })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }  
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)

      const { user, location, token } = data

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      })
      addUserToLocalStorage({ user, location, token })
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        })
      }
    }
    clearAlert()
  }

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }
  const createRent = async () => {
    dispatch({ type: CREATE_RENT_BEGIN })
    try {
      const { console, days, controllers, rentLocation, projector, phone, note, price } = state
      await authFetch.post('/rents', {
        console,
        days,
        controllers,
        rentLocation,
        projector,
        phone,
        note,
        price
      })
      dispatch({ type: CREATE_RENT_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: CREATE_RENT_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const getRents = async () => {
    const { sort } = state

    let url = `/rents?sort=${sort}`
    dispatch({ type: GET_RENTS_BEGIN })
    try {
      const { data } = await authFetch(url)
      const { rents, totalRents } = data
      dispatch({
        type: GET_RENTS_SUCCESS,
        payload: {
          rents,
          totalRents,
        },
      })
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }

  // const setEditRent = (id) => {
  //   dispatch({ type: SET_EDIT_RENT, payload: { id } })
  // }
  // const editRent = async () => {
  //   dispatch({ type: EDIT_RENT_BEGIN })

  //   try {
  //     const { position, company, rentLocation, rentType, status } = state
  //     await authFetch.patch(`/rents/${state.editRentId}`, {
  //       company,
  //       position,
  //       rentLocation,
  //       rentType,
  //       status,
  //     })
  //     dispatch({ type: EDIT_RENT_SUCCESS })
  //     // dispatch({ type: CLEAR_VALUES })
  //   } catch (error) {
  //     if (error.response.status === 401) return
  //     dispatch({
  //       type: EDIT_RENT_ERROR,
  //       payload: { msg: error.response.data.msg },
  //     })
  //   }
  //   clearAlert()
  // }
  // const deleteRent = async (rentId) => {
  //   dispatch({ type: DELETE_RENT_BEGIN })
  //   try {
  //     await authFetch.delete(`/rents/${rentId}`)
  //     getRents()
  //   } catch (error) {
  //     logoutUser()
  //   }
  // }

  // const clearFilters = () => {
  //   dispatch({ type: CLEAR_FILTERS })
  // }

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } })
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createRent,
        getRents,
        // setEditRent,
        // deleteRent,
        // editRent,
        // showStats,
        // clearFilters,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
