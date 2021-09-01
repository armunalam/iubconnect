import axios from 'axios'
import { returnErrors } from './messages'
import API_URL from '../urls'

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from './types'

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: USER_LOADING })

    axios
        .get(`${API_URL}/auth/user`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: USER_LOADED,
                payload: res.data,
            })
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR,
            })
        })
}

// LOGIN USER
export const login = (username, password) => async (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    // Request Body
    const body = JSON.stringify({ username, password })
    // const isLoggedIn = true;

    try {
        const res = await axios.post(`${API_URL}/auth/login`, body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({
            type: LOGIN_FAIL,
        })
        return false
    }
    return true
}

// REGISTER USER
export const register = ({ username, password, email }) => (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    // Request Body
    const body = JSON.stringify({ username, email, password })

    axios
        .post(`${API_URL}/auth/register`, body, config)
        .then((res) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            })
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: REGISTER_FAIL,
            })
        })
}

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
    axios
        .post(`${API_URL}/auth/logout/`, null, tokenConfig(getState))
        .then((res) => {
            dispatch({ type: 'CLEAR_LEADS' })
            dispatch({
                type: LOGOUT_SUCCESS,
            })
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })
}

// Setup config with token - helper function
export const tokenConfig = (getState) => {
    // Get token from state
    const token = getState().auth.token

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    // If token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    return config
}