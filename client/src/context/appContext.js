import React, { useReducer, useContext } from 'react';
import reducer from './reducer';
import axios from 'axios';
import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	REGISTER_USER_BEGIN,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_ERROR,
	LOGIN_USER_BEGIN,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_ERROR,
	SETUP_USER_BEGIN,
	SETUP_USER_SUCCESS,
	SETUP_USER_ERROR,
	TOGGLE_SIDEBAR,
	LOGOUT_USER
} from "./action";

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
const userLocation = localStorage.getItem('location')

const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: '',
	alertType: '',
	user: user ? JSON.parse(user) : null,
	token: token,
	userLocation: userLocation || '',
	jobLocation: userLocation || '',
  showSidebar: false
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const displayAlert = () => {
		dispatch({
			type: DISPLAY_ALERT
		})
		clearAlert()
	}

	const clearAlert = () => {
		setTimeout(() => {
			dispatch({
				type: CLEAR_ALERT
			})
		}, 3000);
	}

	const addUserToLocalStorage = ({ user, token, location }) => {
		localStorage.setItem('user', JSON.stringify(user))
		localStorage.setItem('token', token)
		localStorage.setItem('location', location)
	}

	const removeUserFromLocalStorage = () => {
		localStorage.removeItem('user')
		localStorage.removeItem('token')
		localStorage.removeItem('location')
	}

	const registerUser = async (currentUser) => {
		dispatch({ type: REGISTER_USER_BEGIN })
		try {
			const response = await axios.post('/api/v1/auth/register', currentUser)
			// console.log(response)
			const { user, token, location } = response.data
			dispatch({
				type: REGISTER_USER_SUCCESS,
				payload: {
					user,
					token,
					location,
				},
			})

			// add values to local storage
			addUserToLocalStorage({
				user,
				token,
				location
			})

		} catch (error) {
			// console.log(error.response)
			dispatch({
				type: REGISTER_USER_ERROR,
				payload: { msg: error.response.data.msg },
			})
		}
		clearAlert()
	}

	const loginUser = async (currentUser) => {
		dispatch({ type: LOGIN_USER_BEGIN })
		try {
			const { data } = await axios.post('/api/v1/auth/login', currentUser)
			const { user, token, location } = data;
			dispatch({
				type: LOGIN_USER_SUCCESS,
				payload: {
					user,
					token,
					location
				}
			})

			// add to local storage
			addUserToLocalStorage({
				user,
				token,
				location
			})

		} catch (error) {
			dispatch({
				type: LOGIN_USER_ERROR,
				payload: { msg: error.response.data.msg }
			})
		}
		clearAlert()
	}

	const setupUser = async ({ currentUser, endPoint, alertText }) => {
		dispatch({ type: SETUP_USER_BEGIN })
		try {
			const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
			const { user, token, location } = data;
			dispatch({
				type: SETUP_USER_SUCCESS,
				payload: {
					user,
					token,
					location,
					alertText
				}
			})

			// add to local storage
			addUserToLocalStorage({
				user,
				token,
				location
			})

		} catch (error) {
			dispatch({
				type: SETUP_USER_ERROR,
				payload: { msg: error.response.data.msg }
			})
		}
		clearAlert()
	}

	const toggleSidebar = () => {
		dispatch({
			type: TOGGLE_SIDEBAR
		})
	}

	const logoutUser = () => {
		dispatch({
			type: LOGOUT_USER
		})
		removeUserFromLocalStorage()
	}

	const updateUser = async (currentUser) => {
		try {
			const { data } = await axios.patch('/api/v1/auth/updateUser', currentUser, {
				headers:{
					Authorization: `Bearer ${state.token}`
				}
			})
			console.log(data);
		} catch (error) {
			console.log(error.response);
		}
	}

	return (
		<AppContext.Provider value={{ 
			...state,
			displayAlert,
			registerUser,
			loginUser,
			setupUser,
			toggleSidebar,
			logoutUser,
			updateUser
		}}>
			{children}
		</AppContext.Provider>
	)
}

const useAppContext = () => {
	return useContext(AppContext)
}

export {
	AppProvider,
	initialState,
	useAppContext
}