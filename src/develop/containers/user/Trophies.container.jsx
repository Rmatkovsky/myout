import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _isEqual from 'lodash/isEqual';

import { deleteHandleBack } from '../../actions/api.action';

import filterTrophies from '../../constants/filterTrophies.constant';

import {
    getTrophies,
    setFilter,
    clearDataState,
    clearDataPosts,
} from '../../actions/trophy.actions';

import TrophiesPage from '../../components/pages/user/Trophies.page';

class TrophyContainer extends Component {
    constructor() {
        super();

        this.state = {
            nextPage: true,
            activeFilter: 'latest',
            mediaFilter: 'all',
            firstStart: true,
            pagination: {
                limit: 10,
                offset: 0,
            },
        };

        this.prepareTrophies = this.prepareTrophies.bind(this);
        this.handleSelectFilter = this.handleSelectFilter.bind(this);
        this.handleScrollEvent = this.handleScrollEvent.bind(this);
    }

    componentDidMount() {
        const {
            api,
            match: { params },
            pagination,
            activeFilter,
        } = this.props;
        const { firstStart } = this.state;

        this.state.activeFilter = activeFilter;
        this.state.pagination = pagination;

        window.addEventListener('scroll', this.handleScrollEvent);

        if (api.handleBack) {
            return null;
        }
        if (firstStart) {
            this.prepareTrophies(params);
            this.state.firstStart = false;
        }

        return null;
    }

    componentWillReceiveProps(nextProps) {
        const {
            api,
            match: { params },
            handleDeleteHandleBack,
        } = this.props;
        const {
            activeFilter,
            pagination,
        } = this.state;

        if (api.handleBack) {
            return handleDeleteHandleBack();
        }

        if (
            (activeFilter !== nextProps.activeFilter)
            || (!_isEqual(pagination, nextProps.pagination))
        ) {
            this.state.activeFilter = nextProps.activeFilter;
            this.state.pagination = nextProps.pagination;
            return this.prepareTrophies(nextProps.match.params);
        }

        if (params.type !== nextProps.match.params.type) {
            this.returnToDefaultState();
            this.prepareTrophies(nextProps.match.params);
        }
        return null;
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScrollEvent);
    }

    handleScrollEvent() {
        const { nextPage } = this.state;
        const {
            handleSetFilter,
        } = this.props;
        const { activeFilter, pagination } = this.state;

        const limitHeight = window.innerHeight + 200;
        const set = document.body.clientHeight - window.pageYOffset;

        if (set <= limitHeight && nextPage) {
            this.state.nextPage = false;
            return handleSetFilter({
                filter: activeFilter,
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
        const { handleClearDataPosts } = this.props;
        handleClearDataPosts();
    }

    returnToDefaultState() {
        const { handleClearDataState } = this.props;
        const { pagination } = this.state;

        this.state.activeFilter = 'latest';
        pagination.offset = 0;
        handleClearDataState();
    }

    prepareTrophies() {
        const {
            activeFilter,
            pagination,
        } = this.state;
        const {
            handleGetTrophies,
        } = this.props;


        return handleGetTrophies({
            order: activeFilter,
            offset: pagination.offset,
            limit: pagination.limit,
        });
    }

    handleSelectFilter(code) {
        const {
            handleDeleteHandleBack,
            handleSetFilter,
        } = this.props;

        handleSetFilter({ filter: code });

        handleDeleteHandleBack();
        this.handleClearPosts();
    }

    render() {
        const {
            user,
            trophy,
            categories,
            activeFilter,
        } = this.props;

        return (
            <TrophiesPage
              user={user}
              trophy={trophy}
              categories={categories}
              filterTrophies={filterTrophies}
              activeFilter={activeFilter}
              handleSelectFilter={this.handleSelectFilter}
            />
        );
    }
}

TrophyContainer.propTypes = {
    api: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    activeFilter: PropTypes.string.isRequired,
    pagination: PropTypes.object.isRequired,
    trophy: PropTypes.arrayOf(PropTypes.object).isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleGetTrophies: PropTypes.func.isRequired,
    handleDeleteHandleBack: PropTypes.func.isRequired,
    handleSetFilter: PropTypes.func.isRequired,
    handleClearDataState: PropTypes.func.isRequired,
    handleClearDataPosts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    api: state.api,
    user: state.user.payload,
    isAuthorized: state.user.isAuthorized,
    trophy: state.trophy.payload,
    activeFilter: state.trophy.filter,
    pagination: state.trophy.pagination,
    categories: state.common.categories,
});

const mapDispatchToProps = dispatch => ({
    handleGetTrophies: bindActionCreators(getTrophies, dispatch),
    handleDeleteHandleBack: bindActionCreators(deleteHandleBack, dispatch),
    handleSetFilter: bindActionCreators(setFilter, dispatch),
    handleClearDataState: bindActionCreators(clearDataState, dispatch),
    handleClearDataPosts: bindActionCreators(clearDataPosts, dispatch),

});

export default connect(mapStateToProps, mapDispatchToProps)(TrophyContainer);
