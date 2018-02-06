import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

class Popup extends PureComponent {
    render() {
        const {
            children,
            className,
            buttonName,
            handleSubmit,
            handleCancel,
            hideCancelButton,
        } = this.props;

        const classNamesCancelButton = cl({
            'custom-btn': true,
            cancel: true,
            hide: hideCancelButton,
        });

        return (
            <div className={className}>
                <div className="close" onClick={handleCancel} />
                <div className="container">
                    <p>{children}</p>
                    <button type="button" className="custom-btn submit" onClick={handleSubmit}>{buttonName}</button>
                    <button className={classNamesCancelButton} onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        );
    }
}

Popup.defaultProps = {
    buttonName: 'Ok',
    className: 'popup',
    children: {},
    hideCancelButton: false,
};

Popup.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired,
    buttonName: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    hideCancelButton: PropTypes.bool.isRequired,
};

export default Popup;
