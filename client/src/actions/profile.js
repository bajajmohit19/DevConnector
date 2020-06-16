import axios from 'axios';
import { setAlert } from './alert'

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
                dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'))

                if(!edit) {
                    history.push('/dashboard')
                }

            }).catch((err) => {
                console.log("211212121212",err)
                resolve(
                    dispatch({
                        type: PROFILE_ERROR,
                        payload: { msg: err.response.statusText, status: err.response.status }
                    })
                    
                )
            })
    })

}
