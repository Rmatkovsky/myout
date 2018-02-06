import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    sendReport,
} from '../../actions/challenge.actions';

class ChallengeReportContainer extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClosePopup = this.handleClosePopup.bind(this);
    }

    componentWillMount() {
        const {
            value: {
                item,
                type,
                spam,
            },
            handleSendReport,
        } = this.props;
        const sendData = {
            [type === 'comment' ? 'comment_id' : 'post_id']: item.id,
            spam,
            text: 'spam',
        };

        if (spam) {
            handleSendReport(sendData);
        }
    }

    handleClosePopup() {
        const { handleCloseModal } = this.props;
        const { handleCloseMenu } = this.context;

        handleCloseMenu();
        handleCloseModal();
    }

    handleOnChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit() {
        const {
            value: {
                item,
                type,
            },
            handleSendReport,
        } = this.props;
        const { text } = this.state;
        const sendData = {
            [type === 'comment' ? 'comment_id' : 'post_id']: item.id,
            text,
            spam: false,
        };
        handleSendReport(sendData);
    }

    render() {
        const { value: { spam } } = this.props;
        if (spam) {
            return null;
        }
        return (
            <div className="content" onClick={event => event.stopPropagation()}>
                <span className="title">Report</span>
                <textarea placeholder="The reason of this report" onChange={this.handleOnChange} />
                <button className="btn custom-btn cancel" onClick={this.handleClosePopup}>Cancel</button>
                <button className="btn custom-btn submit" onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}
ChallengeReportContainer.defaultProps = {
    handleCloseModal: () => {},
};

ChallengeReportContainer.contextTypes = {
    handleCloseMenu: PropTypes.func.isRequired,
};

ChallengeReportContainer.propTypes = {
    // user: PropTypes.object.isRequired,
    handleCloseModal: PropTypes.func,
    value: PropTypes.object.isRequired,
    handleSendReport: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    // user: state.user.payload,
    isAuthorized: state.user.isAuthorized,
});

const mapDispatchToProps = (dispatch, { value }) => ({
    value,
    handleSendReport: bindActionCreators(sendReport, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeReportContainer);
