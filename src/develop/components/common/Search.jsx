import React, { Component } from 'react';
import cl from 'classnames';
import PropTypes from 'prop-types';

import SearchItemComponent from './SearchItem';

import { handlePush } from '../../utils/history.helper';

import routes from '../../constants/routes.constant';

class SearchComponent extends Component {
    static handleRedirectToSearchPage(e) {
        e.stopPropagation();
        if (e.keyCode === 13 || !e.keyCode) {
            handlePush({ pathname: routes.search.main() });
        }
    }

    constructor() {
        super();

        this.state = {
            openSearch: false,
            openSearchResult: false,
        };

        this.handleShowSearchResult = this.handleShowSearchResult.bind(this);
        this.handleClickSearch = this.handleClickSearch.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { closeMenu } = nextContext;

        if (closeMenu) {
            this.state.openSearch = false;
            this.state.openSearchResult = false;
        }
        return true;
    }

    handleClickSearch(e) {
        const { handleOpenMenu } = this.context;
        const { openSearch } = this.state;
        const { handleClearDataState } = this.props;

        e.stopPropagation();
        if (!openSearch) {
            this.inputSearch.focus();
            this.setState({ openSearch: true });
            return handleOpenMenu();
        }

        handleClearDataState();

        this.setState({ openSearch: false });
        this.inputSearch.value = '';
        return null;
    }

    handleShowSearchResult(e) {
        const { handleSearch } = this.props;

        handleSearch(e.target.value);
        this.setState({ openSearchResult: true });
    }

    render() {
        const { items, pathname, value, placeholder } = this.props;
        const { openSearch } = this.state;
        const { closeMenu } = this.context;
        const classNameSearch = cl('c-search', {
            active: openSearch && !closeMenu,
        });
        const classNameSearchResult = cl('c-search__results', {
            active: this.state.openSearchResult,
        });
        const isSearchPage = pathname ? pathname.search('search') !== -1 : true;

        return (
            <div className="header__search__wrap">
                <div className={classNameSearch} onClick={event => event.stopPropagation()}>
                    <i className="c-search__icon" onClick={SearchComponent.handleRedirectToSearchPage} />
                    <input
                      className="c-search__input"
                      type="text"
                      placeholder={placeholder}
                      onChange={this.handleShowSearchResult}
                      onKeyUp={SearchComponent.handleRedirectToSearchPage}
                      value={value}
                      ref={(inputSearch) => { this.inputSearch = inputSearch; }}
                    />
                    <div className={classNameSearchResult}>
                        {
                            !isSearchPage ?
                                <ul>
                                    {items.slice(0, 5).map(item => (
                                        <li>
                                            <SearchItemComponent item={item} />
                                        </li>
                                    ))}
                                </ul>
                                : null
                        }
                    </div>
                </div>
                <span className="search-btn" onClick={this.handleClickSearch} />
            </div>
        );
    }
}

SearchComponent.defaultProps = {
    placeholder: 'Search',
};

SearchComponent.contextTypes = {
    handleOpenMenu: PropTypes.func.isRequired,
    closeMenu: PropTypes.bool.isRequired,
};

SearchComponent.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    pathname: PropTypes.object.isRequired,
    handleSearch: PropTypes.func.isRequired,
    handleClearDataState: PropTypes.func.isRequired,
};

export default SearchComponent;
