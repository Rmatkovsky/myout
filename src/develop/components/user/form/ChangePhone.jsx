import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import FormInput from '../../form/user/FormInput';

import { isPhone } from '../../../utils/validation.helper';

class ChangePhoneComponent extends Component {
    render() {
        const { initialValues, errorData, dirty, invalid, handleSubmit } = this.props;
        const textButton = initialValues.phone_verified ? 'Change' : 'Verify';

        return (
            <div className="c-settings-item">
                <div className="c-settings-desc">
                    Phone
                </div>
                <div className="c-settings-handlers flex-form">
                    <Field
                      name="phone"
                      type="text"
                      classaName="c-settings-inputs"
                      maxLength={256}
                      component={FormInput}
                      customErrors={errorData.data ? errorData.data.phone : []}
                      placeholder="Your phone number"
                      turnOnError
                      validate={[
                          isPhone('Your phone is invalid'),
                      ]}
                    />
                    <button
                      type="submit"
                      className="btn-accent"
                      disabled={(!dirty || invalid) && initialValues.phone_verified}
                      onClick={handleSubmit}
                    >
                        {textButton}
                    </button>
                </div>
            </div>
        );
    }
}

ChangePhoneComponent.propTypes = {
    initialValues: PropTypes.object.isRequired,
    dirty: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    errorData: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

const initializeForm = reduxForm({
    form: 'settings_phone',
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
})(ChangePhoneComponent);

const mapStateToProps = (state, { initialValues }) => ({
    initialValues,
    settingsPhoneForm: state.form.settings_phone,
});

export default connect(mapStateToProps)(initializeForm);
