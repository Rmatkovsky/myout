import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _isEqual from 'lodash/isEqual';

import UserOwnPostsComponent from '../../components/user/UserOwnPosts';

import filterUserPostsConstant from '../../constants/filterUserPosts.constant';

import { setParams, deleteHandleBack } from '../../actions/api.action';

import { getPosts/* , clearDataState */ } from '../../actions/user.actions';
import { clearDataState as clearDataStateChallenge } from '../../actions/challenge.actions';

class UserOwnPostsContainer extends Component {
    constructor() {
        super();

        this.state = {
            nextPage: true,
            firstStart: true,
            params: {
                sort: 'created',
            },
            pagination: {
                offset: 0,
                limit: 10,
            },
        };

        this.handleSelectFilter = this.handleSelectFilter.bind(this);
        this.handleScrollEvent = this.handleScrollEvent.bind(this);
    }

    componentWillMount() {
        const {
            handleBack,
            // handleClearDataState,
            handleClearDataStateChallenge,
        } = this.props;

        if (!handleBack) {
            // handleClearDataState();
            handleClearDataStateChallenge();
        }
    }

    componentDidMount() {
        const {
            handleBack,
            handleSetParams,
        } = this.props;
        const { firstStart } = this.state;

        window.addEventListener('scroll', this.handleScrollEvent);

        if (handleBack) {
            return null;
        }

        if (firstStart) {
            handleSetParams({
                key: 'uposts',
                params: { ...this.state.params },
                pagination: { ...this.state.pagination },
            });
        }

        return null;
    }

    componentWillReceiveProps(nextProps) {
        const {
            handleBack,
            handleDeleteHandleBack,
            // handleClearDataState,
            handleClearDataStateChallenge,
            match: { params },
        } = this.props;

        if (handleBack) {
            handleDeleteHandleBack();
        }

        if (nextProps.match.params.id !== params.id) {
            // handleClearDataState();
            handleClearDataStateChallenge();
            this.preparePosts(nextProps.match.params.id);
        }

        if (nextProps.api) {
            const {
                api: {
                    params: {
                        sort,
                    },
                    pagination,
                },
            } = nextProps;
            if (
                (sort !== this.state.params.sort)
                || (!_isEqual(pagination, this.state.pagination))
                || this.state.firstStart
            ) {
                this.state.params = { sort };
                this.state.pagination = pagination;
                this.state.firstStart = false;
                if (!handleBack) {
                    return this.preparePosts();
                }
            }
        }

        return null;
    }

    handleSelectFilter(code) {
        const {
            api,
            handleDeleteHandleBack,
            handleSetParams,
            handleClearDataStateChallenge,
        } = this.props;

        handleDeleteHandleBack();
        handleClearDataStateChallenge();

        this.state.nextPage = false;
        handleSetParams({
            key: 'uposts',
            params: { ...api.params, sort: code },
            pagination: { ...api.pagination, offset: 0 },
        });
    }

    handleScrollEvent() {
        const { nextPage } = this.state;
        const {
            api: {
                params,
                pagination,
            },
            handleSetParams,
        } = this.props;

        const limitHeight = window.innerHeight + 200;
        const set = document.body.clientHeight - window.pageYOffset;

        if (set <= limitHeight && nextPage) {
            this.state.nextPage = false;
            return handleSetParams({
                key: 'uposts',
                params,
                pagination: {
                    ...pagination,
                    offset: pagination.offset + pagination.limit,
                } });
        }
        if (set <= limitHeight) {
            this.state.nextPage = false;
            return null;
        }
        this.state.nextPage = true;
        return null;
    }

    preparePosts(id) {
        const {
            params: {
                sort,
            },
            pagination,
        } = this.state;
        const { handleGetPosts, match: { params } } = this.props;

        switch (sort) {
            case 'created':
                return handleGetPosts({ user_id: id || params.id, ...pagination });

            case 'accepted':
                return handleGetPosts({ user_id: id || params.id, accepted: true, ...pagination });

            case 'won':
                return handleGetPosts({ winner_id: id || params.id, ...pagination });

            default:
                return true;
        }
    }

    render() {
        const { user, posts, categories } = this.props;
        const { params: { sort } } = this.state;

        return user
            ? (
                <UserOwnPostsComponent
                  currentUser={user.current}
                  user={user.payload}
                  posts={posts}
                  categories={categories}
                  activeFilter={sort}
                  userFilters={filterUserPostsConstant}
                  handleSelectFilter={this.handleSelectFilter}
                />
            )
            : null;
    }
}

UserOwnPostsContainer.propTypes = {
    api: PropTypes.object.isRequired,
    handleBack: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    match: PropTypes.object.isRequired,
    handleGetPosts: PropTypes.func.isRequired,
    // handleClearDataState: PropTypes.func.isRequired,
    handleClearDataStateChallenge: PropTypes.func.isRequired,
    handleDeleteHandleBack: PropTypes.func.isRequired,
    handleSetParams: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    api: state.api.uposts,
    handleBack: state.api.handleBack,
    user: state.user,
    categories: state.common.categories,
    posts: state.challenges.payload,
});

const mapDispatchToProps = dispatch => ({
    handleGetPosts: bindActionCreators(getPosts, dispatch),
    // handleClearDataState: bindActionCreators(clearDataState, dispatch),
    handleClearDataStateChallenge: bindActionCreators(clearDataStateChallenge, dispatch),
    handleDeleteHandleBack: bindActionCreators(deleteHandleBack, dispatch),
    handleSetParams: bindActionCreators(setParams, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserOwnPostsContainer);

