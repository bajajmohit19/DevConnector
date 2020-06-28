import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'
import axios from 'axios'
import {
    Button,
    Card,
    Form
} from "antd";
import auth from '../../reducers/auth'

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',

    })
    const [loading1, setLoading] = useState(false)
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = formData

        setLoading(true)
        console.log("SUCCESS")

        let data = await login(email, password)
        setLoading(false)

        console.log("resolve", data)
        // Redirect if logged in


    }

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <Card title="Sign-In" bordered={true} >
                <p className="lead"><i class="fa fa-user"></i> Sign Into Your Account</p>
                <Form className="form" onSubmit={e => onSubmit(e)}>

                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={e => onChange(e)}
                        />

                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={e => onChange(e)}
                            minLength="6"
                        />
                    </div>
                    <Button type="primary" htmlType="submit" loading={loading1}>Login</Button>
                </Form>
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
