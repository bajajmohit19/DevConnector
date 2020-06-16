import React, { useState, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-solid-svg-icons'
import { Icon } from 'antd'
import { createProfile } from '../../actions/profile'

const CreateProfile = ({createProfile, history}) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  })
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData

  const onChange = e =>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const onSubmit = e =>{
    console.log(formData)
    e.preventDefault()
    createProfile(formData, history)
  }
  return (
    <Fragment>
      <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <Icon type="user-add" /> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select name="status" onChange={e => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
          >Give us an idea of where you are at in your career</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" onChange={e => onChange(e)}/>
          <small className="form-text"
          >Could be your own company or one you work for</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" onChange={e => onChange(e)}/>
          <small className="form-text"
          >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" onChange={e => onChange(e)}/>
          <small className="form-text"
          >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" onChange={e => onChange(e)}/>
          <small className="form-text"
          >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            onChange={e => onChange(e)}
          />
          <small className="form-text"
          >If you want your latest repos and a Github link, include your
            username</small
          >
        </div>
        <div className="form-group">
          <textarea onChange={e => onChange(e)} placeholder="A short bio of yourself" name="bio"></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        <div className="form-group social-input">
          <i className="fa fa-twitter fa-2x"></i>
          <input onChange={e => onChange(e)} type="text" placeholder="Twitter URL" name="twitter" />
        </div>

        <div className="form-group social-input">
          <i className="fa fa-facebook fa-2x"></i>
          <input onChange={e => onChange(e)} type="text" placeholder="Facebook URL" name="facebook" />
        </div>

        <div className="form-group social-input">
          <i className="fa fa-youtube fa-2x"></i>

          <input type="text" placeholder="YouTube URL" name="youtube" onChange={e => onChange(e)}/>
        </div>

        <div className="form-group social-input">
          <i className="fa fa-linkedin fa-2x"></i>
          <input type="text" placeholder="Linkedin URL" name="linkedin" />
        </div>

        <div className="form-group social-input">
          <i className="fa fa-instagram fa-2x"></i>
          <input type="text" placeholder="Instagram URL" name="instagram" />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
    </Fragment>
  );
};
CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};


export default connect(null, {createProfile})(withRouter(CreateProfile))