import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import cl from 'classnames';

import Popup from '../../../components/common/Popup';
import FormInput from '../../../components/form/FormInput';

import { requiredCustom, isEmailCustom } from '../../../utils/validation.helper';

class RecoveryPage extends Component {
    render() {
        const { handleCancel, handleSubmit, user } = this.props;
        const classNamePopup = cl({
            popup: true,
            hide: !(user.isRecovery),
        });
        const classNamesMainBlock = cl({
            hide: user.isRecovery,
        });

        return (
            <div className="container recovery-form">
                <div className="logo" />
                <Popup
                  className={classNamePopup}
                  handleCancel={handleCancel}
                  handleSubmit={handleCancel}
                  hideCancelButton
                >
                    You should recieve an email for resetting your password
                </Popup>
                <div className={classNamesMainBlock}>
                    <p className="notice">
                        To reset your password, enter your email adress and we’ll send you
                        instructions on how to create a new password
                    </p>
                    <Field
                      name="email"
                      type="text"
                      maxLength={256}
                      component={FormInput}
                      placeholder="Email"
                      turnOnError
                      turnOnSuccess={false}
                      customErrors={user.errorData.data}
                      validate={[
                          requiredCustom('Please enter a valid email'),
                          isEmailCustom('Please enter a valid email'),
                      ]}
                    />

                    <br />
                    <div className="group-button">
                        <button
                          className="custom-btn pull-left"
                          onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                          type="submit"
                          className="custom-btn submit pull-right"
                          onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

RecoveryPage.propTypes = {
    handleCancel: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

const initializeForm = reduxForm({
    form: 'recovery',
})(RecoveryPage);

export default initializeForm;
