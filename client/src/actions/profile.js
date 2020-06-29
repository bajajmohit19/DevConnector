import axios from 'axios';
import { setAlert } from './alert'
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';

import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types';

// Get current user profiles

export const getCurrentProfile = () => async dispatch => {
    return new Promise((resolve) => {
        axios.get('/api/profile/me')

            .then((doc) => {
                console.log(doc)
                resolve(
                    dispatch({
                        type: GET_PROFILE,
                        payload: doc.data
                    })
                )
            }).catch((err) => {
                console.log(err)
                resolve(
                    dispatch({
                        type: PROFILE_ERROR,
                        payload: { msg: err.response.statusText, status: err.response.status }
                    })
                )
            })

    })
}
// Create or update Profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }

    }
    return new Promise((resolve) => {
        axios.post('/api/profile', formData, config)
            .then((doc) => {
                resolve(
                    dispatch({
                        type: GET_PROFILE,
                        payload: doc.data
                    })
                )
                dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))

                if (!edit) {
                    history.push('/dashboard')
                }

            }).catch((err) => {
                console.log(err, err.stack.status, err.stack.data, "errorrr")
                if (err.response.data.err) {
                    let errors1 = err.response.data.msg
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
                                type: PROFILE_ERROR,
                                payload: { msg: err.response.statusText, status: err.response.status }

                            })

                        )
                    )
                }
            })
    })

}
// Add Experience
export const addExperience = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }

    }
    return new Promise((resolve) => {
        axios.put('/api/profile/experience', formData, config)
            .then((doc) => {
                resolve(
                    dispatch({
                        type: UPDATE_PROFILE,
                        payload: doc.data
                    })
                )
                dispatch(setAlert('Experience Added', 'success'))
                notification.success({
                    message: doc.data.msg,
                })

                    history.push('/dashboard')

            }).catch((err) => {
                console.log(err, err.stack.status, err.stack.data, "errorrr")
                if (err.response.data.err) {
                    let errors1 = err.response.data.msg
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
                                type: PROFILE_ERROR,
                                payload: { msg: err.response.statusText, status: err.response.status }

                            })

                        )
                    )
                }
            })
    })
}
// Add Education

export const addEducation = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }

    }
    return new Promise((resolve) => {
        axios.put('/api/profile/education', formData, config)
            .then((doc) => {
                resolve(
                    dispatch({
                        type: UPDATE_PROFILE,
                        payload: doc.data
                    })
                )
                dispatch(setAlert('Education Added', 'success'))
                notification.success({
                    message: doc.data.msg,
                })

                    history.push('/dashboard')

            }).catch((err) => {
                console.log(err, err.stack.status, err.stack.data, "errorrr")
                if (err.response.data.err) {
                    let errors1 = err.response.data.msg
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
                                type: PROFILE_ERROR,
                                payload: { msg: err.response.statusText, status: err.response.status }

                            })

                        )
                    )
                }
            })
    })
}
