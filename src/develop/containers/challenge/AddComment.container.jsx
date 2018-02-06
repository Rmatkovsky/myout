import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _isEmpty from 'lodash/isEmpty';

import {
    addCommentChallenge,
    addCommentAcceptance,
    addCommentTrophy,
    addTrophyCommentAcceptance,
} from '../../actions/comment.actions';

import AvatarComponent from '../../components/challenge/Avatar';

import routes from '../../constants/routes.constant';

class AddCommentContainer extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            validate: {
                min: 1,
                max: 2200,
            },
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate() {
        const { setFocus, handleSetFocus } = this.props;
        if (setFocus) {
            this.state.text = setFocus;
            this.inputText.focus();
            handleSetFocus(false);
        }
    }

    handleChange(e) {
        if (e.keyCode === 13) {
            return this.setState({ text: this.state.text });
        }

        if (e.target.value.length <= this.state.validate.max) {
            return this.setState({ text: e.target.value });
        }
        return null;
    }

    handleKeyDown(e) {
        const {
            handleAddCommentTrophy,
            handleAddCommentChallenge,
            handleAddCommentAcceptance,
            handleAddTrophyCommentAcceptance,
            item,
            type,
        } = this.props;
        const { text } = this.state;
        if (e.keyCode === 13) {
            e.preventDefault();
        }
        if (e.keyCode === 13 && text.length) {
            if (type === 'challenge') {
                handleAddCommentChallenge({ id: item.id, text });
            } else if (type === 'trophy') {
                handleAddCommentTrophy({ id: item.id, text });
            } else if (type === 'trophy_acceptance') {
                handleAddTrophyCommentAcceptance({ id: item.id, text });
            } else {
                handleAddCommentAcceptance({ id: item.id, text });
            }
            this.setState({ text: '' });
        }
        return null;
    }

    render() {
        const { user } = this.props;
        return _isEmpty(user) ?
                    (
                        <div className="comment-write sign-in">
                            <NavLink to={routes.auth.login()}>Sign in</NavLink><span>&nbsp;to like or comment...</span>
                        </div>
                    )
                    :
                    (<div className="comment-write">
                        <AvatarComponent img={user.avatar_data} />
                        <textarea
                          ref={(input) => { this.inputText = input; }}
                          value={this.state.text}
                          onChange={this.handleChange}
                          onKeyDown={this.handleKeyDown}
                          placeholder="Write a comment..."
                        />
                    </div>);
    }
}

AddCommentContainer.propTypes = {
    item: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    setFocus: PropTypes.string.isRequired,
    handleAddCommentTrophy: PropTypes.func.isRequired,
    handleAddCommentChallenge: PropTypes.func.isRequired,
    handleAddCommentAcceptance: PropTypes.func.isRequired,
    handleAddTrophyCommentAcceptance: PropTypes.func.isRequired,
    handleSetFocus: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    // user: state.user.payload,
    isAuthorized: state.user.isAuthorized,
});

const mapDispatchToProps = dispatch => ({
    handleAddCommentTrophy: bindActionCreators(addCommentTrophy, dispatch),
    handleAddCommentChallenge: bindActionCreators(addCommentChallenge, dispatch),
    handleAddCommentAcceptance: bindActionCreators(addCommentAcceptance, dispatch),
    handleAddTrophyCommentAcceptance: bindActionCreators(addTrophyCommentAcceptance, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCommentContainer);
