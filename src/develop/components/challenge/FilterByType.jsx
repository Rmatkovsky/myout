import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import _Capitalize from 'lodash/capitalize';

class FilterByTypeComponent extends Component {
    constructor() {
        super();
        this.state = {
            openMenu: false,
        };
        this.handleShowMenu = this.handleShowMenu.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { closeMenu } = nextContext;

        if (closeMenu) {
            this.state.openMenu = false;
        }
        return true;
    }

    handleSetFilter(filter) {
        const { setFilter } = this.props;
        setFilter(filter);
    }

    handleShowMenu(e) {
        e.stopPropagation();
        const { handleOpenMenu } = this.context;

        this.setState({ openMenu: true });
        handleOpenMenu();
    }

    render() {
        const { openMenu } = this.state;
        const { closeMenu } = this.context;
        const classNameMenu = cl('more-menu', {
            active: openMenu && !closeMenu,
        });
        const { filter } = this.props;
        const nameFilter = _Capitalize(filter);
        return (
            <div className="filter-type">
                <span onClick={this.handleShowMenu}>{nameFilter}<i className="arrow down" /></span>
                <ul className={classNameMenu}>
                    <li onClick={this.handleSetFilter.bind(this, 'all')}>All</li>
                    <li onClick={this.handleSetFilter.bind(this, 'video')}>Video</li>
                    <li onClick={this.handleSetFilter.bind(this, 'photo')}>Photo</li>
                </ul>
            </div>
        );
    }
}

FilterByTypeComponent.contextTypes = {
    handleOpenMenu: PropTypes.func.isRequired,
    closeMenu: PropTypes.bool.isRequired,
};

FilterByTypeComponent.propTypes = {
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
};

export default FilterByTypeComponent;
