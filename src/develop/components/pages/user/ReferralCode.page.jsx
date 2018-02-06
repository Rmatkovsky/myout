import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

import { handleReplace } from '../../../utils/history.helper';

import Popup from '../../../components/common/Popup';

import routes from '../../../constants/routes.constant';

class ReferralCodePage extends Component {
    static handleGoToTrophy() {
        handleReplace({ pathname: routes.trophy.all() });
    }

    constructor(props) {
        super(props);

        this.state = {
            visibleConfirmPopup: false,
            value: null,
        };

        this.handlerClick = this.handlerClick.bind(this);
        this.handleAnotherCode = this.handleAnotherCode.bind(this);
        this.handleCancelConfirmPopup = this.handleCancelConfirmPopup.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.handleRestoreValue = this.handleRestoreValue.bind(this);
    }

    handleRestoreValue() {
        this.state.value = '';
    }

    changeValue(e) {
        this.setState({ value: e.target.value });
    }

    handleAnotherCode() {
        const { handleClearDataState } = this.props;
        this.handleRestoreValue();
        handleClearDataState();
    }

    handleCancelConfirmPopup() {
        this.setState({ visibleConfirmPopup: false });
    }

    handlerClick() {
        const { handleSubmit } = this.props;
        const { value } = this.state;

        if (value) {
            handleSubmit(value);
        } else {
            this.setState({ visibleConfirmPopup: true });
        }
    }

    render() {
        const { user, handleSkipPage } = this.props;
        const { visibleConfirmPopup, value } = this.state;
        const customErrors = user.errorData.data ? user.errorData.data.guest_promocode : [];
        const visibleSuccessPopup =
            (value) ? value === user.payload.guest_promocode : false;
        const visibleWrongPopup = customErrors.length;
        const classNamesConfirmPopup = cl({
            popup: true,
            hide: !visibleConfirmPopup,
        });
        const classNamesWrongPromo = cl({
            popup: true,
            hide: !visibleWrongPopup,
        });
        const classNamesSuccessPopup = cl({
            popup: true,
            hide: !visibleSuccessPopup,
        });
        const classNamesMainBlock = cl({
            hide: visibleConfirmPopup || visibleSuccessPopup || visibleWrongPopup,
        });

        return (
            <div className="container referral-form">
                <Popup
                  handleSubmit={handleSkipPage}
                  handleCancel={this.handleCancelConfirmPopup}
                  buttonName="Proceed"
                  className={classNamesConfirmPopup}
                >
                    You haven&#39;t entered your promocode. Are you sure you wish to proceed?
                </Popup>
                <Popup
                  handleSubmit={this.handleAnotherCode}
                  handleCancel={handleSkipPage}
                  buttonName="Enter another"
                  className={classNamesWrongPromo}
                >
                    Sorry, the promocode you have entered is not valid. Would you still like to proceed?
                </Popup>
                <Popup
                  handleSubmit={ReferralCodePage.handleGoToTrophy}
                  handleCancel={handleSkipPage}
                  buttonName="See prizes"
                  className={classNamesSuccessPopup}
                >
                    Congratulations.<br /> You now have 100 credits you can use to win real prizes.
                </Popup>
                <div className={classNamesMainBlock}>
                    <p className="notice">If you have a Promocode, please enter it in the field above</p>
                    <div className="app-input-group">
                        <input
                          className="field"
                          name="promo"
                          type="text"
                          maxLength={256}
                          placeholder="Promocode"
                          onChange={this.changeValue}
                          value={value}
                        />
                    </div>

                    <br />
                    <div className="group-button">
                        <button
                          className="custom-btn pull-left"
                          onClick={handleSkipPage}
                        >
                            Skip
                        </button>
                        <button
                          type="submit"
                          className="custom-btn submit pull-right"
                          onClick={this.handlerClick}
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

ReferralCodePage.propTypes = {
    user: PropTypes.object.isRequired,
    handleSkipPage: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleClearDataState: PropTypes.func.isRequired,
};

export default ReferralCodePage;
