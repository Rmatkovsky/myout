import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { requiredCustom, isPasswordCustom } from '../../../utils/validation.helper';
import FormInput from '../../../components/form/FormInput';

class ResetPasswordPage extends Component {
    constructor(props) {
        super(props);

        this.requiredPasswordRepeat = this.requiredPasswordRepeat.bind(this);
    }

    requiredPasswordRepeat(values) {
        const { resetPasswordForm } = this.props;

        if (!resetPasswordForm) {
            return null;
        }

        if (
            Object.prototype.hasOwnProperty.call(resetPasswordForm, 'values')
            &&
            resetPasswordForm.values.password !== values
        ) {
            return 'Passwords do not match';
        }

        return null;
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="container reset-password-form">
                <div className="logo" />
                <p className="notice">
                    Create a new password
                </p>
                <Field
                  name="password"
                  type="password"
                  maxLength={256}
                  component={FormInput}
                  turnOnError
                  placeholder="New password"
                  validate={[
                      requiredCustom('Please enter your password'),
                      isPasswordCustom('Password should be 8 or more characters long with at least 1 digit'),
                  ]}
                />

                <Field
                  name="password_confirmation"
                  type="password"
                  className="field"
                  maxLength={256}
                  component={FormInput}
                  turnOnError
                  placeholder="Confirm new password"
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
                    Submit
                </button>
            </div>
        );
    }
}

ResetPasswordPage.propTypes = {
    resetPasswordForm: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

ResetPasswordPage.defaultProps = {
    resetPasswordForm: {},
};

const initializeForm = reduxForm({
    form: 'reset_password',
    validate: (values) => {
        const errors = {};
        if (values.password_confirmation) {
            if (values.password_confirmation !== values.password) {
                errors.password_confirmation = 'Passwords do not match';
            }
        }

        return errors;
    },
})(ResetPasswordPage);

export default connect(state => ({ resetPasswordForm: state.form.reset_password }))(initializeForm);
