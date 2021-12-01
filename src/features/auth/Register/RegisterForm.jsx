import React from 'react';
import { Form, Segment, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm} from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import {connect} from 'react-redux'
import {registerUser} from '../authAction'
import { combineValidators, isRequired } from 'revalidate';

const mapState = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const actions = {
  registerUser
}

const validate = combineValidators({
  displayName: isRequired('Name is required'),
  email: isRequired('Email is required'),
  password: isRequired('Password is required')
})



const RegisterForm = ({handleSubmit, registerUser, error, invalid, submitting}) => {
  
  return (
    <div>
      <Form size="large">
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          {error && <Label basic color='red' content={error} /> }
          <Button disabled={invalid || submitting} onClick={handleSubmit(registerUser)} fluid size="large" color="teal">
            Register
          </Button>
        </Segment>
      </Form>
    </div>
  );
};

export default connect(mapState, actions)(reduxForm({form: 'registerForm', validate})(RegisterForm))