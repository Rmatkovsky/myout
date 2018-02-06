import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import FormInput from '../../form/user/FormInput';

import { requiredCustom, isPasswordCustom } from '../../../utils/validation.helper';

class ChangePasswordComponent extends Component {
    render() {
        const { errorData, dirty, invalid, handleSubmit } = this.props;

        return (
            <div className="c-settings-item">
                <div className="c-settings-desc">
                    Change Password
                </div>
                <div className="c-settings-handlers pass">
                    <Field
                      name="current_password"
                      type="password"
                      maxLength={256}
                      component={FormInput}
                      customErrors={errorData.data ? errorData.data.current_password : []}
                      placeholder="Type your current password"
                      turnOnError
                      validate={[
                          requiredCustom('Password not be empty'),
                          isPasswordCustom('Please enter valid current password'),
                      ]}
                    />
                    <Field
                      name="password"
                      type="password"
                      maxLength={256}
                      component={FormInput}
                      customErrors={errorData.data ? errorData.data.password : []}
                      placeholder="Type your new password"
                      turnOnError
                      validate={[
                          requiredCustom('Password not be empty'),
                          isPasswordCustom('Please enter valid new password'),
                      ]}
                    />
                    <Field
                      name="password_confirmation"
                      type="password"
                      classaName="c-settings-inputs pass"
                      maxLength={256}
                      component={FormInput}
                      customErrors={errorData.data ? errorData.data.password_confirmation : []}
                      placeholder="Retype your new password"
                      turnOnError
                      validate={[
                          requiredCustom('Password not be empty'),
                      ]}
                    />
                    <button
                      type="submit"
                      className="btn-accent"
                      disabled={!dirty || invalid}
                      onClick={handleSubmit}
                    >
                        Change
                    </button>
                </div>
            </div>
        );
    }
}

ChangePasswordComponent.propTypes = {
    dirty: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    errorData: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

const initializeForm = reduxForm({
    form: 'settings_password',
    validate: (values) => {
        const errors = {};

        if (values.password_confirmation) {
            if (values.password_confirmation !== values.password) {
                errors.password_confirmation = 'Passwords do not match';
            }
        }

        return errors;
    },
})(ChangePasswordComponent);

const mapStateToProps = state => ({
    settingsPasswordForm: state.form.settings_password,
});

export default connect(mapStateToProps)(initializeForm);
