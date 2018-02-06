import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class FacebookErrorComponent extends PureComponent {
    render() {
        const { value: { error }, handleCloseModal } = this.props;
        return (
            <div className="content">
                <div className="report--img-exclamation" />
                <span className="report--text">
                    {error.data[0]}
                </span>
                <button className="btn custom-btn submit close-modal" onClick={handleCloseModal}>Ok</button>
            </div>
        );
    }
}

FacebookErrorComponent.propTypes = {
    value: PropTypes.object.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
};

export default FacebookErrorComponent;
