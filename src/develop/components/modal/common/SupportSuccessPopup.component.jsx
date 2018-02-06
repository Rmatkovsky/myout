import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class SupportSuccessPopup extends PureComponent {
    render() {
        const { handleCloseModal } = this.props;
        return (
            <div className="content">
                <div className="report--img-success" />
                <span className="report--text">
                    Thanks for contacting OutDoo support.
                    <br />
                    We will get back to you shortly.
                </span>
                <button className="btn custom-btn submit close-modal" onClick={handleCloseModal}>Close</button>
            </div>
        );
    }
}

SupportSuccessPopup.defaultProps = {
    handleCloseModal: () => {},
};

SupportSuccessPopup.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
};

export default SupportSuccessPopup;
