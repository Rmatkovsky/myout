import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _findIndex from 'lodash/findIndex';
import _isEqual from 'lodash/isEqual';

import { setParams, deleteHandleBack } from '../../actions/api.action';
import { handlePush } from '../../utils/history.helper';

import filterChallengesConstant from '../../constants/filterChallenges.constant';

import {
    getChallenges,
    loadMoreChallenges,
    clearDataState,
} from '../../actions/challenge.actions';

import { setScrollDirectionChallengeFeeds, unsetScrollDirectionChallengeFeeds } from '../../utils/helper';

import ChallengesPage from '../../components/pages/user/Challenges.page';

class FeedsContainer extends Component {
    static getIndexTypeCategory(categories, params) {
        if (params.type !== 'all') {
            const nameType =
                params.type.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
            const indexType = _findIndex(categories, item => item.name === nameType);
            return indexType;
        }
        return false;
    }

    constructor() {
        super();

        this.state = {
            nextPage: true,
            firstStart: true,
            params: {
                sort: 'latest',
                filter: 'all',
            },
            pagination: {
                limit: 10,
                offset: 0,
            },
        };

        this.prepareChallenges = this.prepareChallenges.bind(this);
        this.handleSelectFilter = this.handleSelectFilter.bind(this);
        this.handleSelectMedia = this.handleSelectMedia.bind(this);
        this.handleScrollEvent = this.handleScrollEvent.bind(this);
    }

    componentWillMount() {
        const { handleBack, handleClearDataState } = this.props;

        if (!handleBack) {
            handleClearDataState();
        }
    }

    componentDidMount() {
        const {
            handleBack,
            handleSetParams,
        } = this.props;
        const { firstStart } = this.state;

        window.addEventListener('scroll', this.handleScrollEvent);
        setScrollDirectionChallengeFeeds();

        if (handleBack) {
            return null;
        }

        if (firstStart) {
            handleSetParams({
                key: 'challenges',
                params: { ...this.state.params },
                pagination: { ...this.state.pagination },
            });
        }

        return null;
    }

    componentWillReceiveProps(nextProps) {
        const {
            handleBack,
            match: { params },
            handleDeleteHandleBack,
        } = this.props;

        if (handleBack) {
            handleDeleteHandleBack();
        }

        if (nextProps.api) {
            const {
                api: {
                    params: {
                        sort,
                        filter,
                    },
                    pagination,
                },
            } = nextProps;
            if (
                (sort !== this.state.params.sort)
                || (!_isEqual(pagination, this.state.pagination))
                || (filter !== this.state.params.filter)
                || this.state.firstStart
        ) {
                this.state.params = {
                    filter,
                    sort,
                };
                this.state.pagination = pagination;
                this.state.firstStart = false;
                return this.prepareChallenges(nextProps.match.params);
            }
        }

        if (params.type !== nextProps.match.params.type) {
            this.returnToDefaultState();
            return this.prepareChallenges(nextProps.match.params);
        }

        return null;
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScrollEvent);
        unsetScrollDirectionChallengeFeeds();
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
                key: 'challenges',
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

    handleClearPosts() {
        const { handleClearDataState } = this.props;
        handleClearDataState();
    }

    returnToDefaultState() {
        const { handleClearDataState } = this.props;

        this.state.params = {
            sort: 'latest',
            filter: 'all',
        };
        this.state.pagination = {
            ...this.state.pagination,
            offset: 0,
        };
        handleClearDataState();
    }

    prepareChallenges(params) {
        const {
            params: {
                sort,
                filter,
            },
            pagination,
        } = this.state;
        const {
            categories,
            handleGetChallenges,
        } = this.props;
        const indexType = FeedsContainer.getIndexTypeCategory(categories, params);

        if (indexType === -1) {
            return handlePush({ pathname: '/404' });
        }

        return handleGetChallenges({
            typeId: indexType !== false ? categories[indexType].id : '',
            order: sort,
            media: filter,
            offset: pagination.offset,
            limit: pagination.limit,
        });
    }

    handleSelectFilter(code) {
        const {
            api,
            handleDeleteHandleBack,
            handleSetParams,
        } = this.props;

        handleSetParams({
            key: 'challenges',
            params: { ...api.params, sort: code },
            pagination: { ...api.pagination, offset: 0 },
        });

        handleDeleteHandleBack();
        this.handleClearPosts();
    }

    handleSelectMedia(code) {
        const {
            api,
            handleDeleteHandleBack,
            handleSetParams,
        } = this.props;

        handleSetParams({
            key: 'challenges',
            params: { ...api.params, filter: code },
            pagination: { ...api.pagination, offset: 0 },
        });

        handleDeleteHandleBack();
        this.handleClearPosts();
    }

    render() {
        const {
            user,
            challenges,
            categories,
        } = this.props;
        const {
            params: {
                sort,
                filter,
            },
        } = this.state;

        return (
            <ChallengesPage
              user={user}
              challenges={challenges}
              categories={categories}
              filterChallenges={filterChallengesConstant}
              sort={sort}
              filter={filter}
              handleSelectFilter={this.handleSelectFilter}
              handleSelectMediaFilter={this.handleSelectMedia}
            />
        );
    }
}

FeedsContainer.propTypes = {
    api: PropTypes.object.isRequired,
    handleBack: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    challenges: PropTypes.arrayOf(PropTypes.object).isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleGetChallenges: PropTypes.func.isRequired,
    handleClearDataState: PropTypes.func.isRequired,
    handleDeleteHandleBack: PropTypes.func.isRequired,
    handleSetParams: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    api: state.api.challenges,
    handleBack: state.api.handleBack,
    user: state.user.payload,
    isAuthorized: state.user.isAuthorized,
    challenges: state.challenges.payload,
    categories: state.common.categories,
});

const mapDispatchToProps = dispatch => ({
    handleGetChallenges: bindActionCreators(getChallenges, dispatch),
    handleLoadMoreChallenges: bindActionCreators(loadMoreChallenges, dispatch),
    handleClearDataState: bindActionCreators(clearDataState, dispatch),
    handleDeleteHandleBack: bindActionCreators(deleteHandleBack, dispatch),
    handleSetParams: bindActionCreators(setParams, dispatch),

});

export default connect(mapStateToProps, mapDispatchToProps)(FeedsContainer);
