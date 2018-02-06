import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { sendMessage } from '../../../actions/user.actions';

class SupportPopupComponent extends PureComponent {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const { handleSendMessage } = this.props;
        const text = this.textSupport.value;

        if (text) {
            handleSendMessage({ text });
        }
    }

    render() {
        const { handleCloseModal } = this.props;
        return (
            <div className="content" onClick={event => event.stopPropagation()}>
                <span className="title">Contact support</span>
                <textarea
                  placeholder="Your question here"
                  onChange={this.handleOnChange}
                  ref={(text) => { this.textSupport = text; }}
                />
                <button className="btn custom-btn cancel" onClick={handleCloseModal}>Cancel</button>
                <button className="btn custom-btn submit" onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}

SupportPopupComponent.defaultProps = {
    handleCloseModal: () => {},
};

SupportPopupComponent.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
    handleSendMessage: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    handleSendMessage: bindActionCreators(sendMessage, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SupportPopupComponent);
