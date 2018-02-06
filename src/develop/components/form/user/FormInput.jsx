import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isPlainObject from 'lodash/isPlainObject';
import _isString from 'lodash/isString';
import cl from 'classnames';

class FormInput extends Component {
    constructor(props) {
        super(props);

        this.handleBlur = this.handleBlur.bind(this);
    }

    handleBlur(context) {
        const { input: { onBlur }, handleBlur } = this.props;

        onBlur(context);
        if (handleBlur) {
            handleBlur();
        }
    }

    renderServerValidationErrors() {
        const {
            customErrors,
            meta: {
                touched,
                error,
                dirty,
                submitFailed,
            },
            hideErrorTooltip,
            hideCustomErrors,
        } = this.props;

        if (hideErrorTooltip) {
            return true;
        }

        if ((touched && error && dirty) || (submitFailed && error)) {
            return (
                <div className="error-msg">{error}</div>
            );
        }

        if (!customErrors || _isPlainObject(customErrors) || hideCustomErrors) {
            return null;
        }

        if (_isString(customErrors)) {
            return (
                <div className="error-msg">{customErrors}</div>
            );
        }

        return customErrors.map(err => (
            <div className="error-msg">{err}</div>
        ));
    }

    render() {
        const {
            input,
            type,
            className,
            handleFocus,
            disabled,
            turnOnError,
            turnOnSuccess,
            handleKeyDown,
            customErrors,
            meta: { touched, error, dirty, submitFailed },
            ...rest
        } = this.props;
        const inputClassNames = cl({
            [className]: true,
        });
        const classMainBlock = cl('input-handler', {
            error: (touched && error && dirty) || (submitFailed && error) || customErrors.length,
        });

        return (
            <div className={classMainBlock}>
                <input
                  {...input}
                  type={type}
                  disabled={disabled}
                  onFocus={handleFocus}
                  onBlur={this.handleBlur}
                  onKeyDown={handleKeyDown}
                  className={inputClassNames}
                  {...rest}
                />
                {
                    this.renderServerValidationErrors()
                }
            </div>
        );
    }
}

FormInput.defaultProps = {
    disabled: false,
    handleFocus: null,
    handleBlur: null,
    handleKeyDown: null,
    className: 'c-settings-inputs',
    customErrors: [],
    turnOnError: false,
    turnOnSuccess: true,
    hideErrorTooltip: false,
    hideCustomErrors: false,
};

FormInput.propTypes = {
    input: PropTypes.object.isRequired,
    turnOnError: PropTypes.bool.isRequired,
    turnOnSuccess: PropTypes.bool.isRequired,
    customErrors: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    handleFocus: PropTypes.func,
    handleBlur: PropTypes.func,
    handleKeyDown: PropTypes.func,
    disabled: PropTypes.bool.isRequired,
    meta: PropTypes.object.isRequired,
    hideErrorTooltip: PropTypes.object.isRequired,
    hideCustomErrors: PropTypes.object.isRequired,
};

export default FormInput;
