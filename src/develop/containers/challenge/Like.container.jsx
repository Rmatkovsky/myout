import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import { bindActionCreators } from 'redux';
import cl from 'classnames';

import { setLike, unsetLike } from '../../actions/challenge.actions';
import { setCommentLike, unsetCommentLike } from '../../actions/comment.actions';

import { handlePush } from '../../utils/history.helper';

import routes from '../../constants/routes.constant';

class LikeContainer extends Component {
    constructor() {
        super();

        this.state = {
            liked: false,
            count: 0,
        };

        this.handleClickLike = this.handleClickLike.bind(this);
        this.handleClickLikeComment = this.handleClickLikeComment.bind(this);
    }

    componentWillMount() {
        this.state.liked = this.props.item.liked_by_me;
        this.state.count = this.props.item.likes_count;
    }

    componentWillReceiveProps(nextProps) {
        const { liked, count } = this.state;

        if (nextProps.item.liked_by_me !== liked) {
            this.state.liked = nextProps.item.liked_by_me;
        }
        if (nextProps.item.likes_count !== count) {
            this.setState({ count: nextProps.item.likes_count });
        }
    }

    handleLike() {
        const { user } = this.props;
        const { liked, count } = this.state;
        if (_isEmpty(user)) {
            return handlePush({ pathname: routes.auth.login() });
        }
        return this.setState({ liked: !liked, count: (!liked) ? count + 1 : count - 1 });
    }

    handleClickLikeComment() {
        const {
            item,
            handleSetCommentLike,
            handleUnsetCommentLike,
        } = this.props;
        const { liked } = this.state;

        this.handleLike();

        if (liked) {
            return handleUnsetCommentLike({ id: item.id });
        }
        return handleSetCommentLike({ id: item.id });
    }

    handleClickLike() {
        const {
            item,
            handleSetLike,
            handleUnsetLike,
        } = this.props;
        const { liked } = this.state;

        this.handleLike();

        if (liked) {
            return handleUnsetLike({ id: item.id });
        }
        return handleSetLike({ id: item.id });
    }

    renderComment() {
        const classNameLikes = cl('comment-likes', {
            liked: this.state.liked,
        });
        return (
            <div className={classNameLikes} onClick={this.handleClickLikeComment}>
                {this.state.count}
            </div>
        );
    }

    renderView() {
        const classNameLikes = cl('info icons likes', {
            liked: this.state.liked,
        });

        return (
            <div className={classNameLikes} onClick={this.handleClickLike}>
                {this.state.count}
            </div>
        );
    }

    renderDetails() {
        const classNameLikes = cl('icons likes', {
            liked: this.state.liked,
        });
        return (
            <span>
                <i className={classNameLikes} onClick={this.handleClickLike} />
                {this.state.count}
            </span>
        );
    }

    render() {
        const { type } = this.props;

        switch (type) {
            case 'comment':
                return this.renderComment();
            case 'view':
                return this.renderView();
            case 'details':
                return this.renderDetails();
            default:
                return null;
        }
    }
}

LikeContainer.propTypes = {
    user: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    handleSetLike: PropTypes.func.isRequired,
    handleUnsetLike: PropTypes.func.isRequired,
    handleSetCommentLike: PropTypes.func.isRequired,
    handleUnsetCommentLike: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    user: state.user.payload,
    isAuthorized: state.user.isAuthorized,
});

const mapDispatchToProps = dispatch => ({
    handleSetLike: bindActionCreators(setLike, dispatch),
    handleUnsetLike: bindActionCreators(unsetLike, dispatch),
    handleSetCommentLike: bindActionCreators(setCommentLike, dispatch),
    handleUnsetCommentLike: bindActionCreators(unsetCommentLike, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LikeContainer);
