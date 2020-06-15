import axios from 'axios';
import {setAlert} from './alert'

import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types';

// Get current user profiles

export const getCurrentProfile = ()=> async dispatch => {
    return new Promise((resolve)=>{
     axios.get('/api/profile/me')
        
    .then((doc)=>{
        console.log(doc)
        resolve(
            dispatch({
                type:GET_PROFILE,
                payload:doc.data
            })
        )
    }).catch((err)=>{
        console.log(err)
         resolve(
            dispatch({
                type: PROFILE_ERROR,
                payload:{msg: err.response.statusText, status: err.response.status}
            })
        )
    })

})
}
// Create or update Profile
