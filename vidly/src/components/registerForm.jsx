import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { register } from '../services/userService';
import auth from '../services/authService';

class RegisterForm extends Form {
  state = {
    data: {
      email: '',
      password: '',
      name: '',
    },
    errors: { }
  };

  schema = {
    email: Joi.string()
                 .email()
                 .required()
                 .label('Email'),
    password: Joi.string()
                 .min(5)
                 .required()
                 .label('Password'),
    name: Joi.string()
             .required()
             .label('Name'),
  }
  
  doSubmit = async () => {
    try {
      const { headers } = await register(this.state.data);
      auth.loginWithJwt(headers['x-auth-token']);
      window.location = '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = {...this.state.errors};
        errors.email = ex.response.data;

        this.setState({ errors });
      }
    }
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('email', 'Email', 'email')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name', 'name')}
          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}
 
export default RegisterForm;