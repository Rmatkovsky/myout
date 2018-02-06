import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class DeleteConfirmPopupComponent extends PureComponent {
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
        const { value: { text, handleSubmit } } = this.props;

        return (
            <div className="content">
                <div className="report--img-exclamation" />
                <span className="report--text">
                    {text}
                </span>
                <button className="btn custom-btn submit close-modal" onClick={handleSubmit}>Delete</button>
                <button className="btn custom-btn cancel-2" onClick={this.handleClosePopup}>Cancel</button>
            </div>
        );
    }
}

DeleteConfirmPopupComponent.contextTypes = {
    handleCloseMenu: PropTypes.func.isRequired,
};

DeleteConfirmPopupComponent.propTypes = {
    value: PropTypes.object.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
};

export default DeleteConfirmPopupComponent;
