import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _isEqual from 'lodash/isEqual';

import {
    getNews,
    setFilter,
    clearDataState,
} from '../../actions/news.actions';

import NewsPage from '../../components/pages/user/News.page';

class NewsContainer extends Component {
    constructor() {
        super();

        this.state = {
            nextPage: true,
            pagination: {
                limit: 10,
                offset: 0,
            },
        };

        this.handleScrollEvent = this.handleScrollEvent.bind(this);
    }

    componentDidMount() {
        const {
            pagination,
        } = this.props;

        this.state.pagination = pagination;
        window.addEventListener('scroll', this.handleScrollEvent);
        this.prepareNews();
    }

    componentWillReceiveProps(nextProps) {
        const {
            pagination,
        } = this.state;

        if (!_isEqual(pagination, nextProps.pagination)) {
            this.state.pagination = nextProps.pagination;
            return this.prepareNews();
        }
        return null;
    }

    componentWillUnmount() {
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

    prepareNews() {
        const {
            pagination,
        } = this.state;
        const {
            handleGetNews,
        } = this.props;

        return handleGetNews(pagination);
    }

    render() {
        const {
            user,
            news,
            categories,
    } = this.props;

        return (
            <NewsPage
              user={user}
              news={news}
              categories={categories}
            />
        );
    }
}

NewsContainer.propTypes = {
    user: PropTypes.object.isRequired,
    pagination: PropTypes.object.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    news: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleGetNews: PropTypes.func.isRequired,
    handleSetFilter: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    api: state.api,
    user: state.user.payload,
    isAuthorized: state.user.isAuthorized,
    news: state.news.payload,
    categories: state.common.categories,
    pagination: state.news.pagination,
});

const mapDispatchToProps = dispatch => ({
    handleGetNews: bindActionCreators(getNews, dispatch),
    handleSetFilter: bindActionCreators(setFilter, dispatch),
    handleClearDataState: bindActionCreators(clearDataState, dispatch),

});

export default connect(mapStateToProps, mapDispatchToProps)(NewsContainer);
