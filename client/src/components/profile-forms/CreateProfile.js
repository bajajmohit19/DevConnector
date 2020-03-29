import React, {useState} from 'react'
import {connect} from 'react-router-dom'
import PropTypes from 'prop-types'

const CreateProfile = props =>{
    const [formData, setFormData] = useState({
        company:'',
        website:'',
        location:'',
        status:'',
        skills:'',
        githubusername:'',
        bio:'',
        twitter:'',
        facebook:'',
        linkedin:'',
        youtube:'',
        instagram:''
    })
     return (
         <div>

         </div>
     )
}
CreateProfile.propTypes = {

}

export default CreateProfile