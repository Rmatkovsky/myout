import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class SuccessReportComponent extends PureComponent {
    constructor(props) {
        super(props);

        this.handleClosePopup = this.handleClosePopup.bind(this);
    }

    handleClosePopup() {
        const { handleCloseModal } = this.props;
        const { handleCloseMenu } = this.context;

        handleCloseMenu();
        handleCloseModal();
    }
    render() {
        return (
            <div className="content">
                <div className="report--img-success" />
                <span className="report--text">
                    Thanks for reporting this post!
                    <br />
                    We will take necessary actions!
                </span>
                <button className="btn custom-btn submit close-modal" onClick={this.handleClosePopup}>Close</button>
            </div>
        );
    }
}

SuccessReportComponent.contextTypes = {
    handleCloseMenu: PropTypes.func.isRequired,
};

SuccessReportComponent.defaultProps = {
    handleCloseModal: () => {},
};

SuccessReportComponent.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
};

export default SuccessReportComponent;
