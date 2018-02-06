import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CreditsPage extends Component {
    render() {
        const { user: { credits } } = this.props;
        return (
            <div>
                <div className="c-credits-title">
                    Credits
                </div>
                <div className="c-credits-wrap">
                    <i className="icon credits-big" />
                    <div className="c-credits-info">
                        <p className="c-credits-count">You have {credits} credits!</p>
                        <p>
                            You can purchase more credits
                            from your mobile app
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

CreditsPage.propTypes = {
    user: PropTypes.object.isRequired,
};

export default CreditsPage;
