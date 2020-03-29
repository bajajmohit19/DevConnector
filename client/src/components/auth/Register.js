import React, { Fragment, useState, useCallback, Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { Form, Icon, Input, Button, Checkbox, notification, Card } from 'antd';

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        loading: false
    }

    onChange = (e) => {
        console.log(e.target.name)
    }

    onSubmit = async (e) => {
        const { password, password2, name, email, loading } = this.state
        e.preventDefault()
        this.props.form.validateFieldsAndScroll(async (err, valData) => {
            console.log(valData, err)
            const { name, email, password, password2 } = valData
            if (!err) {
                console.group("in")
                if (password !== password2) {
                    this.props.setAlert("Password do not match", 'danger')
                    
                } else {
                    this.props.register({ name, email, password })
                }
            }
            else {
                if (password !== password2) {
                    this.props.setAlert("Password do not match", 'danger')
                } else {
                    console.log("asdasda");
        this.setState({loading: true})

                    this.props.register({ name, email, password })
                    this.setState({loading: false})
                }
            }
        })
        if(this.props.isAuthenticated){
            return <Redirect to='/dashboard'/>
        }

        // console.log("call")
        // e.preventDefault()
        // if (password !== password2) {
        //     setAlert("Password do not match", 'danger')
        // }
        // else {
        //     register({ name, email, password })
        //     // setFormData({name:'',email:'',password:'',password2:''})
        // }
    }
    render() {
        const {isAuthenticated} = this.props
        const {loading} = this.state
        const {

            form: { getFieldDecorator, getFieldValue, setFieldsValue }
        } = this.props
        const submitFormLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 10, offset: 7 },
                md: { span: 12, offset: 8 }
            }
        }
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
                md: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
                md: { span: 12 }
            }
        }
        const labels = ['name', 'email', 'password', 'password2']

        return (
            <Fragment>
                {isAuthenticated && <Redirect to='/dashboard'/>}
                <h1 className="large text-primary">Sign Up</h1>
                <Card bordered={true} >
                    <p className="lead"><i class="fa fa-user"></i> Create Your Account</p>
                    <Form onSubmit={e => this.onSubmit(e)}
                    >


                        {labels.map((label) => {
                            if (label == 'password' || label == 'password2') {
                                return <Form.Item label={label == 'password' ? 'password' : 'confirm password'} {...formItemLayout}>
                                    {getFieldDecorator(label, {
                                        rules: [{ required: true, message: `Please input your ${label}` }]
                                    })(
                                        <Input
                                            type='password'
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder={label == 'password' ? label : 'confirm password'}
                                            onChange={e => this.onChange(e)}
                                        />
                                    )}
                                </Form.Item>
                            }
                            return <Form.Item label={label} {...formItemLayout}>
                                {getFieldDecorator(label, {
                                    rules: [{ required: true, message: `Please input your ${label}` }]
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder={label}
                                        onChange={e => this.onChange(e)}
                                    />
                                )}
                            </Form.Item>
                        })
                        }

                        <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                SAVE
                                        </Button>
                        </Form.Item>
                    </Form>

                </Card>
                <p className="my-1">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </Fragment>
        );
    }
};


const registerForm = Form.create({ name: 'horizontal_login' })(Register);

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(
    mapStateToProps,
    {
        setAlert,
        register
    },

)(registerForm);
