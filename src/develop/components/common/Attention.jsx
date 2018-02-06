import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class AttentionComponent extends PureComponent {
    render() {
        const { text } = this.props;

        return (
            <div className="attention">
                <span className="sign" />
                <span className="text">
                    {text}
                </span>
            </div>
        );
    }
}

AttentionComponent.propTypes = {
    text: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AttentionComponent;
