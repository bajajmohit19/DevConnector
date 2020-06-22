import axios from 'axios'
import { setAlert } from './alert'
import { REGISTER_SUCCESS, REGISTER_FAIL, AUTH_ERROR, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE } from '../actions/types'
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';
import setAuthToken from '../utils/setAuthToken'

// Load User

export const loadUser = () => async dispatch => {
    console.log("Qdeqdqe")
    if (localStorage.token) {
        console.log("Qdeqdqe")

        setAuthToken(localStorage.token)
    }
    return new Promise((resolve) => {
        console.log("Qdeqdqe")

        axios.get('/api/auth')
            .then((d) => {
                console.log("121212121", d.data)
                resolve(
                    dispatch({
                        type: USER_LOADED,
                        payload: d.data
                    })
                )
            })
            .catch((err) => {
                console.log("11111111111111111", err)
                dispatch({
                    type: AUTH_ERROR,
                    payload: err
                })
            })
    })
}

// Register User
export const register = ({ name, email, password }) => async dispatch => {
    const body = JSON.stringify({ name, email, password })
    console.log("asdasdda", body)
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return new Promise((resolve) => {
        axios.post('/api/users', body, config)
            .then((d) => {
                console.log("Asfasfa")
                console.log(d.data, d)


                resolve(
                    dispatch({
                        type: REGISTER_SUCCESS,
                        payload: d.data
                    }),
                    dispatch(setAlert(d.data.msg, 'success')),
                    dispatch(loadUser())

                )
                notification.success({
                    message: d.data.msg,
                })
            })
            .catch((err) => {
                console.log(err, err.stack.status, err.stack.data, "errorrr")
                if (err.response.data.err) {
                    let errors1 = err.response.data.msg
                    // console.log(errors1)
                    dispatch(setAlert(errors1, 'danger'))
                    notification.error({
                        message: err.response.data.msg,
                    })

                } else {
                    let errors2 = err.response.data.errors
                    errors2.forEach(error => {
                        notification.error({
                            message: error.msg
                        })
                    })

                    resolve(
                        errors2.forEach((error) =>
                            dispatch(
                                setAlert(error.msg, 'danger')
                            ),

                            dispatch({
                                type: REGISTER_FAIL,
                                payload: err

                            })

                        )
                    )
                }
            })

    })

}
// Login User

// Login User
export const login = (email, password) => async dispatch => {
    const body = JSON.stringify({ email, password })
    console.log("asdasdda", body)
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return new Promise((resolve) => {
        axios.post('/api/auth', body, config)
            .then((d) => {
                console.log("Asfasfa")
                console.log(d.data, d)


                resolve(
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: d.data
                    }),
                    // dispatch(setAlert(d.data.msg, 'success')),
                    dispatch(loadUser())
                )

            })
            .catch((err) => {
                console.log(err, err.response.status, err.response.data, "errorrr")
                if (err.response.data.err) {
                    let errors1 = err.response.data.msg
                    // console.log(errors1)
                    resolve(dispatch(setAlert(errors1, 'danger'), dispatch({
                        type: LOGIN_FAIL,
                        loading: false

                    })))
                    notification.error({
                        message: err.response.data.msg,
                    })

                } else {
                    let errors2 = err.response.data.errors
                    resolve(errors2.forEach(error => {
                        notification.error({
                            message: error.msg
                        })
                    }), dispatch({
                        type: LOGIN_FAIL,
                        loading: false


                    })
                    )

                    resolve(
                        errors2.forEach((error) =>
                            dispatch(
                                setAlert(error.msg, 'danger')
                            ),

                            dispatch({
                                type: LOGIN_FAIL,
                                loading: false


                            })

                        )
                    )
                }
            })

    })

}
// Logout/Clear
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT })
    dispatch({ type: CLEAR_PROFILE })

}
// export default register