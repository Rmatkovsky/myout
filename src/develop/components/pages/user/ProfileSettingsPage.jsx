import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { copyInBuffer } from '../../../utils/helper';

import FilterComponent from '../../challenge/Filter';

import UserPersonalInfoComponent from '../../user/form/PersonalInfo';
import ChangePasswordComponent from '../../user/form/ChangePassword';
import ChangeMailComponent from '../../user/form/ChangeMail';
import ChangePhoneComponent from '../../user/form/ChangePhone';
import FacebookConnectComponent from '../../user/form/FacebookConnect';

class ProfileSettingsPage extends Component {
    render() {
        const {
            handleSubmit,
            errorData,
            initialValues,
            handleSubmitVerifyEmail,
            handleSubmitVerifyPhone,
            filters,
            activeFilter,
            handleSelectFilter,
        } = this.props;

        return (
            <div>
                <div className="post-filter__wrap m-dropdown">
                    <FilterComponent
                      filters={filters}
                      activeFilter={activeFilter}
                      handleSelectFilter={handleSelectFilter}
                    />
                </div>
                <div className="c-settings-container">
                    <UserPersonalInfoComponent
                      errorData={errorData}
                      onSubmit={handleSubmit}
                      initialValues={initialValues}
                    />

                    <ChangePasswordComponent
                      errorData={errorData}
                      onSubmit={handleSubmit}
                      initialValues={initialValues}
                    />
                    <ChangeMailComponent
                      errorData={errorData}
                      onSubmit={handleSubmitVerifyEmail}
                      initialValues={initialValues}
                    />
                    <ChangePhoneComponent
                      errorData={errorData}
                      onSubmit={handleSubmitVerifyPhone}
                      initialValues={initialValues}
                    />
                    <FacebookConnectComponent />
                    <div className="c-settings-item">
                        <div className="c-settings-desc">
                            My promocode
                        </div>
                        <div className="c-settings-handlers">
                            <div className="promo-area">
                                <div className="promo-info">
                                    <div className="promo-desk">
                                        Share your PromoCode and receive free credits when new user registers with it
                                    </div>
                                    <form className="promo-code" onClick={copyInBuffer.bind(this, 'promo-id')}>
                                        <input
                                          id="promo-id"
                                          name="promocode"
                                          value={initialValues.promocode}
                                        />
                                        <i className="icon copy" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ProfileSettingsPage.contextTypes = {
    closeMenu: PropTypes.bool.isRequired,
};

ProfileSettingsPage.defaultProps = {
    errorData: {},
};

ProfileSettingsPage.propTypes = {
    errorData: PropTypes.object.isRequired,
    initialValues: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleSubmitVerifyEmail: PropTypes.func.isRequired,
    handleSubmitVerifyPhone: PropTypes.func.isRequired,
    filters: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeFilter: PropTypes.string.isRequired,
    handleSelectFilter: PropTypes.func.isRequired,
};

export default ProfileSettingsPage;
