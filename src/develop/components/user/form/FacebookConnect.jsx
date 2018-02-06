import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FacebookLogin from 'react-facebook-login';

import { facebookConnect } from '../../../actions/user.actions';
import apiConfig from '../../../config/apiConfig';

class FacebookConnectComponent extends Component {

    constructor(props) {
        super(props);

        this.handleFacebookCallback = this.handleFacebookCallback.bind(this);
    }

    handleFacebookCallback(response) {
        const { handleFacebookConnect } = this.props;

        const requestData = {
            provider: 'facebook',
            token: response.accessToken,
        };

        handleFacebookConnect(requestData);
    }

    render() {
        const { user } = this.props;
        const textFB = user.facebook_connected ? 'Facebook Connected' : 'Facebook Connect';
        return (
            <div className="c-settings-item">
                <div className="c-settings-desc">
                    Social Profiles
                </div>
                <div className="c-settings-handlers">
                    <FacebookLogin
                      appId={apiConfig.fbApp}
                      autoLoad={0}
                      callback={this.handleFacebookCallback}
                      textButton={textFB}
                      cssClass="custom-btn fb"
                    />
                </div>
            </div>
        );
    }
}

FacebookConnectComponent.propTypes = {
    user: PropTypes.object.isRequired,
    handleFacebookConnect: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    api: state.api,
    user: state.user.current,
});

const mapDispatchToProps = dispatch => ({
    handleFacebookConnect: bindActionCreators(facebookConnect, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FacebookConnectComponent);
