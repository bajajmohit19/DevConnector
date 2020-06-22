import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'
import axios from 'axios'
import {
    Button,
    Card
} from "antd";
import auth from '../../reducers/auth'

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        loading: false

    })
    // const [loading, setLoading] = useState(false)
    console.log("121212", formData.loading )
    const { email, password } = formData
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        setFormData({ ...formData, loading: false })

        console.log("SUCCESS")

        let data = login(email, password)
        setFormData({ ...formData, loading: true })

        console.log("resolve", data)
        console.log("adcjvcyashbgaukbchesd", formData.loading )
        // Redirect if logged in


    }

    if (isAuthenticated) {
        console.log("qqqqqqqqqqqqqq")
        return <Redirect to="/dashboard" />
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
                    <Button type="primary" htmlType="submit" loading={formData.loading}>Login</Button>
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
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
})
export default connect(mapStateToProps, { login })(Login);
