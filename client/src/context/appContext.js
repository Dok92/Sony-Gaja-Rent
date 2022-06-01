import React, { useReducer, useContext } from 'react'

import reducer from './reducer'
import axios from 'axios'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
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
  // CREATE_TROPHY_SUCCESS,
  // CREATE_TROPHY_ERROR,
  // GET_TROPHIES_SUCCESS,
} from './actions'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertType: '',
  alertText: '',
  trophyType: '',
  trophyText: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  console: '',
  days: 0, 
  daysOptionsPs4: ['', 1, 2, 3, 4, 5, 6, 7], 
  daysOptionsPs5: ['', 1, 2, 3],  
  controllers: 0,
  controllersOptions: ['', 2, 4],
  rentLocation: '',
  rentLocationOptions: ['', 'Novi Sad', 'Veternik', 'Futog', 'Sremska Kamenica', 'Petrovaradin'],
  projector: 'Ne',
  projectorOptions: ['Ne', '1 dan', '2 dana', '3 dana', '4 dana'], 
  phone: '',
  note: '',
  price: 0,
  rents: [],
  totalRents: 0,
  totalSpent: 0,
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
    } 
    catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
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
      const { console, days, controllers, rentLocation, projector, phone, note, price, trophyType, trophyText } = state
      await authFetch.post('/rents', {
        console,
        days,
        controllers,
        rentLocation,
        projector,
        phone,
        note,
        price,
        trophy: [trophyType, trophyText],
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
      const { rents, totalRents, totalSpent } = data
      dispatch({
        type: GET_RENTS_SUCCESS,
        payload: {
          rents,
          totalRents,
          totalSpent,
        },
      })
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }

  // const createTrophy = async () => {
  //   try {
  //     const { trophyType, trophyText } = state
  //     await authFetch.post('/trophies', {
  //       trophyType,
  //       trophyText
  //     })
  //     dispatch({ type: CREATE_TROPHY_SUCCESS })
  //   } catch (error) {
  //     if (error.response.status === 401) return
  //     dispatch({
  //       type: CREATE_TROPHY_ERROR,
  //       payload: { msg: error.response.data.msg },
  //     })
  //   }
  // }

  // const getTrophies = async () => {
  //   const { sort } = state

  //   let url = `/rents?sort=${sort}`
  //   dispatch({ type: GET_RENTS_BEGIN })
  //   try {
  //     const { data } = await authFetch(url)
  //     const { rents, totalRents, totalSpent } = data
  //     dispatch({
  //       type: GET_RENTS_SUCCESS,
  //       payload: {
  //         rents,
  //         totalRents,
  //         totalSpent,
  //       },
  //     })
  //   } catch (error) {
  //     logoutUser()
  //   }
  //   clearAlert()
  // }

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createRent,
        getRents,
        // createTrophy,
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
