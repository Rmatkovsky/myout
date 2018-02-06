import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import _findIndex from 'lodash/findIndex';

class FilterComponent extends Component {
    constructor() {
        super();

        this.state = {
            openFilter: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleShowFilter = this.handleShowFilter.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { closeMenu } = nextContext;

        if (closeMenu) {
            this.state.openFilter = false;
        }
        return true;
    }

    handleShowFilter(e) {
        const { handleOpenMenu } = this.context;
        e.stopPropagation();
        handleOpenMenu();
        this.setState({ openFilter: true });
    }

    handleClick(code) {
        const { handleSelectFilter } = this.props;
        handleSelectFilter(code);
    }

    renderButtonFilter(filter) {
        const { activeFilter } = this.props;
        const classNamesFilter = cl('btn button-link',
            {
                active: activeFilter === filter.code,
            },
        );

        return (
            <li
              className={classNamesFilter}
              onClick={this.handleClick.bind(this, filter.code)}
              key={filter.code}
            >
                {filter.name}
            </li>
        );
    }

    render() {
        const { closeMenu } = this.context;
        const { openFilter } = this.state;
        const { filters, className, activeFilter } = this.props;
        const classNameFilter = cl('post-filter', {
            [className]: true,
        });
        const classNameFilterList = cl('filter-list', {
            show: !closeMenu && openFilter,
        });
        const indexFilter = _findIndex(filters, { code: activeFilter });

        return (
            <div className={classNameFilter}>
                <span className="filter-mobile" onClick={this.handleShowFilter}>
                    {indexFilter === -1 ? 'none' : filters[indexFilter].name}
                    <i className="arrow down" />
                </span>
                <ul className={classNameFilterList}>
                    {
                        filters.map(filter => (this.renderButtonFilter(filter)))
                    }
                </ul>
            </div>
        );
    }
}

FilterComponent.contextTypes = {
    handleOpenMenu: PropTypes.func.isRequired,
    closeMenu: PropTypes.bool.isRequired,
};

FilterComponent.defaultProps = {
    className: '',
};

FilterComponent.propTypes = {
    className: PropTypes.string,
    activeFilter: PropTypes.string.isRequired,
    filters: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleSelectFilter: PropTypes.func.isRequired,
};

export default FilterComponent;
