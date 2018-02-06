import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _isEqual from 'lodash/isEqual';

import SearchComponent from '../../components/common/Search';
import SearchPage from '../../components/pages/common/Search.page';

import filterSearch from '../../constants/filterSearch.constant';
import { MODAL_POPUP_INVINTE_CHALLENGE } from '../../constants/modals.constant';

import {
    getUsersSearch,
    getChallengesSearch,
    clearDataState,
    setFilter,
    setSearch,
    clearDataResults,
} from '../../actions/search.actions';

import { getPosts, getFollowers, getFollowing } from '../../actions/user.actions';
import { clearDataState as challangesClearDataState } from '../../actions/challenge.actions';

class SearchContainer extends Component {
    constructor() {
        super();

        this.state = {
            instanceTimeout: null,
            nextPage: true,
            tab: 'users',
            pagination: {
                limit: 10,
                offset: 0,
                search: '',
            },
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleScrollEvent = this.handleScrollEvent.bind(this);
        this.handleSetTab = this.handleSetTab.bind(this);
    }

    componentDidMount() {
        const {
            pagination,
            match,
        } = this.props;

        this.state.pagination = pagination;
        if (match) {
            window.addEventListener('scroll', this.handleScrollEvent);
        }
    }

    componentWillReceiveProps(nextProps) {
        const {
            pagination,
            tab,
        } = this.state;
        const { pathname } = nextProps;
        const isManagePosts = pathname.indexOf('posts/manage') !== -1;

        const { match, handleClearDataResults } = this.props;

        if (tab !== nextProps.search.tab) {
            this.state.tab = nextProps.search.tab;
            handleClearDataResults();
            if (!match) {
                return null;
            }
            return this.prepareSearch();
        }

        if (!_isEqual(pagination, nextProps.pagination)) {
            this.state.pagination = nextProps.pagination;
            if (!match && !isManagePosts) {
                return null;
            }
            return this.prepareSearch();
        }

        return null;
    }

    componentWillUnmount() {
        const { handleClearDataState } = this.props;
        handleClearDataState();
        window.removeEventListener('scroll', this.handleScrollEvent);
    }

    handleScrollEvent() {
        const { nextPage, pagination } = this.state;
        const { handleSetFilter } = this.props;

        const limitHeight = window.innerHeight + 200;
        const set = document.body.clientHeight - window.pageYOffset;

        if (set <= limitHeight && nextPage) {
            this.state.nextPage = false;
            return handleSetFilter({
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

    handleSetTab(code) {
        const { handleSetFilter } = this.props;
        handleSetFilter({ tab: code });
    }

    handleSearch(search) {
        const {
            handleSetSearch,
            handleClearDataResults,
        } = this.props;
        const { instanceTimeout } = this.state;

        this.state.pagination.search = search;
        handleClearDataResults();
        handleSetSearch({ search });

        if (!instanceTimeout) {
            this.state.instanceTimeout = setTimeout(() => {
                this.prepareSearch();
                clearTimeout(instanceTimeout);
                this.setState({ instanceTimeout: null });
            }, 1000);
        }
        return null;
    }

    prepareSearch() {
        const {
            api,
            user,
            modal,
            pathname,
            handleGetUsersSearch,
            handleGetChallengesSearch,
            handleGetUserFollowers,
            handleGetUserFollowing,
            handleGetPosts,
            handleChallengesClearDataState,
        } = this.props;

        const { pagination: { offset, limit, search }, tab } = this.state;
        const isUserFollow = pathname.indexOf('following') !== -1 || pathname.indexOf('followers') !== -1;
        const isManagePosts = pathname.indexOf('posts/manage') !== -1;

        if (isUserFollow) {
            const handleActive =
                window.location.pathname.indexOf('following') !== -1 ? handleGetUserFollowing : handleGetUserFollowers;
            return handleActive({ id: user.current.id, search });
        }

        if (modal.extend && modal.data.key === MODAL_POPUP_INVINTE_CHALLENGE) {
            const handleActive =
                api.invite.params.filter === 'following' ? handleGetUserFollowing : handleGetUserFollowers;
            return handleActive({ id: user.payload.id, search });
        }

        if (isManagePosts) {
            handleChallengesClearDataState();
            return handleGetPosts({ user_id: user.payload.id, search });
        }

        if (!search) {
            return null;
        }

        if (tab === 'challenges') {
            return handleGetChallengesSearch({ offset, limit, search });
        }

        return handleGetUsersSearch({ offset, limit, search });
    }

    render() {
        const {
            user,
            modal,
            search,
            match,
            pathname,
            pagination,
            categories,
            handleClearDataResults,
        } = this.props;
        const { tab } = this.state;
        const isUserFollow = pathname.indexOf('following') !== -1 || pathname.indexOf('followers') !== -1;
        const isManagePosts = pathname.indexOf('posts/manage') !== -1;
        const isModalInvite = modal.extend && modal.data.key === MODAL_POPUP_INVINTE_CHALLENGE;
        const placeholder = (isModalInvite || isUserFollow) ? 'Search Followers or Following' : 'Search';

        return match ?
            (
                <SearchPage
                  categories={categories}
                  user={user.payload}
                  items={search.payload}
                  activeFilter={tab}
                  filters={filterSearch}
                  handleSelectFilter={this.handleSetTab}
                />
            ) : (
                <SearchComponent
                  items={search.payload}
                  pathname={pathname}
                  value={pagination.search}
                  handleSearch={this.handleSearch}
                  placeholder={isManagePosts ? 'Search Your Posts' : placeholder}
                  handleClearDataState={handleClearDataResults}
                />
            );
    }

}

SearchContainer.propTypes = {
    api: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired,
    modal: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    pagination: PropTypes.object.isRequired,
    pathname: PropTypes.object.isRequired,
    handleGetUsersSearch: PropTypes.func.isRequired,
    handleGetChallengesSearch: PropTypes.func.isRequired,
    handleClearDataState: PropTypes.func.isRequired,
    handleSetFilter: PropTypes.func.isRequired,
    handleSetSearch: PropTypes.func.isRequired,
    handleClearDataResults: PropTypes.func.isRequired,
    handleGetUserFollowers: PropTypes.func.isRequired,
    handleGetUserFollowing: PropTypes.func.isRequired,
    handleGetPosts: PropTypes.func.isRequired,
    handleChallengesClearDataState: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    api: state.api,
    user: state.user,
    search: state.search,
    pagination: state.search.pagination,
    categories: state.common.categories,
    modal: state.common.modal,
});

const mapDispatchToProps = dispatch => ({
    handleGetUsersSearch: bindActionCreators(getUsersSearch, dispatch),
    handleGetChallengesSearch: bindActionCreators(getChallengesSearch, dispatch),
    handleClearDataState: bindActionCreators(clearDataState, dispatch),
    handleClearDataResults: bindActionCreators(clearDataResults, dispatch),
    handleSetFilter: bindActionCreators(setFilter, dispatch),
    handleSetSearch: bindActionCreators(setSearch, dispatch),
    handleGetUserFollowers: bindActionCreators(getFollowers, dispatch),
    handleGetUserFollowing: bindActionCreators(getFollowing, dispatch),
    handleGetPosts: bindActionCreators(getPosts, dispatch),
    handleChallengesClearDataState: bindActionCreators(challangesClearDataState, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
