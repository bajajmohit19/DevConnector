import React, { Fragment, useState } from 'react'
import {Link, Redirect} from 'react-router-dom'
import  {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from '../../actions/auth'
import axios from 'axios'
import {
    Button,
    Card
} from "antd";

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
       
    })
    const [loading, setLoading] = useState(false)
    const { email, password } = formData
    const onChange = (e) => {
        console.log(e.target.name)
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        setLoading({loading:true})

        e.preventDefault()
            console.log("SUCCESS")
            login(email, password)
        setLoading(false)
            // Redirect if logged in
           
            
        }
        if(isAuthenticated){
            console.log("qqqqqqqqqqqqqq")
            return <Redirect to="/dashboard"/>
        }
    
    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <Card title="Sign-Up" bordered={true} >
                <p className="lead"><i class="fa fa-user"></i> Sign Into Your Account</p>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={e => onChange(e)}
                        />
                      
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={e => onChange(e)}
                            minLength="6"
                        />
                    </div>
                    <Button type="primary" htmlType="submit" loading={loading}>Login</Button>
                </form>
            </Card>
            <p className="my-1">
                Dont have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}
const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
})
export default connect(mapStateToProps,{login})(Login);
