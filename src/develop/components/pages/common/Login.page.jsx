import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import FacebookLogin from 'react-facebook-login';

import { requiredCustom } from '../../../utils/validation.helper';
import apiConfig from '../../../config/apiConfig';
import FormInput from '../../../components/form/FormInput';

class LoginPage extends Component {
    render() {
        const {
            user,
            handleSubmit,
            handleForgotPassword,
            handleFacebook,
        } = this.props;

        return (
            <div className="container login-form">
                <div className="logo" />
                <FacebookLogin
                  appId={apiConfig.fbApp}
                  autoLoad={0}
                  fields="name,email,picture"
                  callback={handleFacebook}
                  textButton="Connect with facebook"
                  cssClass="custom-btn fb"
                />

                <span className="border-text" />

                <Field
                  name="name"
                  type="text"
                  maxLength={256}
                  component={FormInput}
                  turnOnError
                  customErrors={user.errorData.data ? user.errorData.data.name || user.errorData.data.email : []}
                  placeholder="Username or email"
                  validate={[
                      requiredCustom('Please enter username or email'),
                  ]}
                />

                <Field
                  type="password"
                  name="password"
                  className="field"
                  maxLength={256}
                  component={FormInput}
                  placeholder="Password"
                  turnOnError
                  customErrors={user.errorData.data ? user.errorData.data.password : []}
                  validate={[
                      requiredCustom('Please enter your password'),
                  ]}
                />
                <br />
                <br />
                <button
                  type="submit"
                  className="custom-btn submit"
                  onClick={handleSubmit}
                >
                    Log In
                </button>
                <button
                  className="custom-btn"
                  onClick={handleForgotPassword}
                >
                    Forgot password?
                </button>

            </div>
        );
    }
}


LoginPage.propTypes = {
    // classNames: PropTypes.string,
    user: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleForgotPassword: PropTypes.func.isRequired,
    handleFacebook: PropTypes.func.isRequired,
};

LoginPage.defaultProps = {
    classNames: '',
};

const initializeForm = reduxForm({
    form: 'login',
})(LoginPage);

export default initializeForm;
