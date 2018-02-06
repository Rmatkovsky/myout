import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import { bindActionCreators } from 'redux';

import { resendVerifyEmail, resendVerifyPhone, sendVerifyEmail, sendVerifyPhone } from '../../../actions/user.actions';

import regexp from '../../../constants/regExp.constant';

class VerifyingPopupComponent extends Component {
    constructor() {
        super();

        this.handleSendVerify = this.handleSendVerify.bind(this);
        this.handleResendVerify = this.handleResendVerify.bind(this);
    }

    handleSendVerify(e) {
        const {
            value: { type },
            handleSendVerifyEmail,
            handleSendVerifyPhone,
        } = this.props;
        const handler = type === 'phone' ? handleSendVerifyPhone : handleSendVerifyEmail;

        e.stopPropagation();
        handler({ code: this.codeInput.value });
    }

    handleResendVerify(e) {
        const {
            value: { type },
            handleResendVerifyEmail,
            handleResendVerifyPhone,
        } = this.props;
        const handler = type === 'phone' ? handleResendVerifyPhone : handleResendVerifyEmail;

        e.stopPropagation();
        handler();
    }

    render() {
        const { user: { errorData }, value: { type }, handleCloseModal } = this.props;
        const text = type === 'phone' ? 'sms' : 'email';

        return (
            <div className="content verify">
                <span className="title text-center">
                    Enter the 4-digit code<br /> we just sent to your {text}
                </span>
                <input
                  type="text"
                  placeholder="X - X - X - X"
                  maxLength="4"
                  pattern={regexp.fourDigits}
                  className="verify-input"
                  ref={(input) => { this.codeInput = input; }}
                />
                {
                    !_isEmpty(errorData) ? <div className="error-msg">{errorData.data[0]}</div> : null
                }
                <button className="btn custom-btn submit" onClick={this.handleSendVerify}>Verify</button>
                <button className="btn custom-btn code" onClick={this.handleResendVerify}>Send a new code</button>
                <button className="btn custom-btn cancel" onClick={handleCloseModal}>Cancel</button>
            </div>
        );
    }
}

VerifyingPopupComponent.defaultProps = {
    handleCloseModal: () => {},
};

VerifyingPopupComponent.propTypes = {
    user: PropTypes.object.isRequired,
    value: PropTypes.object.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    handleSendVerifyEmail: PropTypes.func.isRequired,
    handleSendVerifyPhone: PropTypes.func.isRequired,
    handleResendVerifyEmail: PropTypes.func.isRequired,
    handleResendVerifyPhone: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    handleSendVerifyEmail: bindActionCreators(sendVerifyEmail, dispatch),
    handleSendVerifyPhone: bindActionCreators(sendVerifyPhone, dispatch),
    handleResendVerifyEmail: bindActionCreators(resendVerifyEmail, dispatch),
    handleResendVerifyPhone: bindActionCreators(resendVerifyPhone, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyingPopupComponent);
