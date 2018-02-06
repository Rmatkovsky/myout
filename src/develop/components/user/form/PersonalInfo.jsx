import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import FormInput from '../../form/user/FormInput';

import AvatarComponent from '../../../components/challenge/Avatar';
import UserChangeAvatarComponent from '../../user/UserChangeAvatar';

import { isNicknameCustom } from '../../../utils/validation.helper';

class UserPersonalInfoComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textareaValue: '',
        };

        this.handleTextArea = this.handleTextArea.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.textareaValue !== nextProps.initialValues.bio) {
            this.state.textareaValue = nextProps.initialValues.bio;
        }
    }

    handleTextArea(e) {
        this.setState({ textareaValue: e.target.value });
    }

    render() {
        const {
            handleSubmit,
            errorData,
            initialValues,
        } = this.props;

        return (
            <div>
                <div className="c-settings-item avatar-item">
                    <div className="c-settings-desc">
                        Photo
                    </div>
                    <div className="c-settings-handlers">
                        <AvatarComponent classname="c-settings-avatar" img={initialValues.avatar_data} />
                        <UserChangeAvatarComponent />
                    </div>
                </div>
                <div className="c-settings-item">
                    <div className="c-settings-desc">
                        Username
                    </div>
                    <div className="c-settings-handlers">
                        <Field
                          name="name"
                          type="text"
                          maxLength={256}
                          component={FormInput}
                          customErrors={errorData.data ? errorData.data.name : []}
                          placeholder="Username"
                          turnOnError
                          validate={[
                              isNicknameCustom('Please use only Latin letters and digits'),
                          ]}
                        />
                    </div>
                </div>
                <div className="c-settings-item">
                    <div className="c-settings-desc">
                        Bio
                    </div>
                    <div className="c-settings-handlers">
                        <Field
                          type="text"
                          name="bio"
                          component="textarea"
                          className="c-settings-inputs bio"
                          placeholder="Write some text about you..."
                          maxLength="150"
                          onChange={this.handleTextArea}
                        />
                        <span className="c-settings-inputs-counts">
                            { this.state.textareaValue ? this.state.textareaValue.length : 0 }/150
                        </span>
                    </div>
                </div>
                <div className="c-settings-item">
                    <div className="c-settings-desc">
                        Private profile
                    </div>
                    <div className="c-settings-handlers">
                        <label className="c-settings-checkbox">
                            <Field
                              className="checkbox-default"
                              type="checkbox"
                              name="private"
                              component="input"
                            />
                            <span className="checkbox-custom" />
                            <span className="label-checkbox">
                                    Private profiles can be viewed by accepted users only.</span>
                        </label>
                    </div>
                </div>

                <div className="c-settings-item">
                    <div className="c-settings-desc" />
                    <div className="c-settings-handlers">
                        <button type="submit" className="btn-accent" onClick={handleSubmit}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

UserPersonalInfoComponent.defaultProps = {
    errorData: {},
};

UserPersonalInfoComponent.propTypes = {
    errorData: PropTypes.object.isRequired,
    initialValues: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

const initializeForm = reduxForm({
    form: 'settings',
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
})(UserPersonalInfoComponent);

const mapStateToProps = (state, { initialValues }) => ({
    initialValues,
    settingsForm: state.form.settings,
});

export default connect(mapStateToProps)(initializeForm);
