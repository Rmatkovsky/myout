import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import FormInput from '../../form/user/FormInput';
import { isEmailCustom } from '../../../utils/validation.helper';


class ChangeMailComponent extends Component {
    render() {
        const { initialValues, errorData, dirty, invalid, handleSubmit } = this.props;
        const textButton = initialValues.email_verified ? 'Change' : 'Verify';

        return (
            <div className="c-settings-item">
                <div className="c-settings-desc">
                    Email
                </div>
                <div className="c-settings-handlers flex-form">
                    <Field
                      name="email"
                      type="text"
                      classaName="c-settings-inputs"
                      maxLength={256}
                      component={FormInput}
                      customErrors={errorData.data ? errorData.data.email : []}
                      placeholder="Your email"
                      turnOnError
                      validate={[
                          isEmailCustom('Please enter valid email'),
                      ]}
                    />
                    <button
                      type="submit"
                      className="btn-accent"
                      disabled={(!dirty || invalid) && initialValues.email_verified}
                      onClick={handleSubmit}
                    >
                        {textButton}
                    </button>
                </div>
            </div>
        );
    }
}


ChangeMailComponent.propTypes = {
    initialValues: PropTypes.object.isRequired,
    dirty: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    errorData: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

const initializeForm = reduxForm({
    form: 'settings_mail',
    enableReinitialize: true,
    validate: (values) => {
        const errors = {};

        if (values.password_repeat) {
            if (values.password_repeat !== values.password) {
                errors.password_repeat = 'Passwords do not match';
            }
        }

        return errors;
    },
})(ChangeMailComponent);

const mapStateToProps = (state, { initialValues }) => ({
    initialValues,
    settingsMailForm: state.form.settings_mail,
});

export default connect(mapStateToProps)(initializeForm);
