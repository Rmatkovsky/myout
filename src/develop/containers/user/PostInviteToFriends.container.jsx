import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _isEqual from 'lodash/isEqual';

import filterUserFollow from '../../constants/filterUserFollow.constant';
import InvitePostPage from '../../components/pages/user/InvitePost.page';

import { setParams } from '../../actions/api.action';
import { getUserById, getFollowing, getFollowers } from '../../actions/user.actions';
import { sendInvite } from '../../actions/challenge.actions';

// import { setScrollDirectionChallengeFeeds, unsetScrollDirectionChallengeFeeds } from '../../utils/helper';

class PostInviteToFriendsContainer extends Component {
    constructor() {
        super();

        this.state = {
            nextPage: true,
            firstStart: true,
            params: {
                filter: 'followers',
            },
            pagination: {
                limit: 10,
                offset: 0,
            },
        };
        // this.handleScrollEvent = this.handleScrollEvent.bind(this);
        this.handleSelectFilter = this.handleSelectFilter.bind(this);
        this.handleSendInviteFriends = this.handleSendInviteFriends.bind(this);
    }

    componentDidMount() {
        const {
            handleSetParams,
        } = this.props;
        const { firstStart } = this.state;

        // window.addEventListener('scroll', this.handleScrollEvent);
        // setScrollDirectionChallengeFeeds();

        if (firstStart) {
            document.documentElement.scrollTop = 0;
            handleSetParams({
                key: 'invite',
                params: { ...this.state.params },
                pagination: { ...this.state.pagination },
            });
        }

        return null;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.api) {
            const {
                api: {
                    params: {
                        filter,
                    },
                    pagination,
                },
            } = nextProps;
            if ((!_isEqual(pagination, this.state.pagination))
                || (filter !== this.state.params.filter)
                || this.state.firstStart
            ) {
                this.state.params = { filter };
                this.state.pagination = pagination;
                this.state.firstStart = false;
                return this.prepareFollows();
            }
        }

        return true;
    }

    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.handleScrollEvent);
    //     unsetScrollDirectionChallengeFeeds();
    // }

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
                key: 'invite',
                params,
                pagination: {
                    ...pagination,
                    offset: pagination.offset + pagination.limit,
                },
            });
        }
        if (set <= limitHeight) {
            this.state.nextPage = false;
            return null;
        }
        this.state.nextPage = true;
        return null;
    }

    handleSelectFilter(code) {
        const {
            api,
            handleSetParams,
        } = this.props;

        handleSetParams({
            key: 'invite',
            params: { ...api.params, filter: code },
            pagination: { ...api.pagination, offset: 0 },
        });
    }

    handleSendInviteFriends(id) {
        const { value: { item }, handleSendInvite } = this.props;

        handleSendInvite({ id: item.id, receiver: id });
    }

    prepareFollows() {
        const { handleGetFollowing, handleGetFollowers, user: { payload: { id } } } = this.props;
        const { params: { filter } } = this.state;
        const handleAction = filter === 'followers' ? handleGetFollowers : handleGetFollowing;

        handleAction({ id });
    }

    render() {
        const { user, currentUser, handleCloseModal } = this.props;
        const { params: { filter } } = this.state;

        return (
            <InvitePostPage
              user={user.payload}
              items={user[filter]}
              currentUser={currentUser}
              filter={filter}
              filters={filterUserFollow}
              handleSelectFilter={this.handleSelectFilter}
              handleCloseModal={handleCloseModal}
              handleSendInvite={this.handleSendInviteFriends}
            />
        );
    }
}

PostInviteToFriendsContainer.propTypes = {
    api: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    value: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    handleGetFollowing: PropTypes.func.isRequired,
    handleGetFollowers: PropTypes.func.isRequired,
    handleSetParams: PropTypes.func.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    handleSendInvite: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    api: state.api.invite,
    user: state.user,
    currentUser: state.user.current,
    acceptances: state.trophy.current.acceptances || [],
});

const mapDispatchToProps = dispatch => ({
    handleGetUser: bindActionCreators(getUserById, dispatch),
    handleGetFollowing: bindActionCreators(getFollowing, dispatch),
    handleGetFollowers: bindActionCreators(getFollowers, dispatch),
    handleSetParams: bindActionCreators(setParams, dispatch),
    handleSendInvite: bindActionCreators(sendInvite, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostInviteToFriendsContainer);

