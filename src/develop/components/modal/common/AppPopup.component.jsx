import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class DownloadAppPopupComponent extends PureComponent {
    render() {
        const { handleCloseModal } = this.props;
        return (
            <div className="content">
                <div className="report--img-exclamation" />
                <span className="report--text">
                    Create and partisipate in challenges and win
                    <br />
                    real prizes by downloading OutDoo App!
                </span>
                <a className="download-btn appstore" />
                <a className="download-btn play" />
                <button className="btn custom-btn cancel-2" onClick={handleCloseModal}>Cancel</button>
            </div>
        );
    }
}

DownloadAppPopupComponent.defaultProps = {
    handleCloseModal: () => {},
};

DownloadAppPopupComponent.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
};

export default DownloadAppPopupComponent;
