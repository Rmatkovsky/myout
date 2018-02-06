import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cl from 'classnames';

import routes from '../../constants/routes.constant';

class MenuComponent extends Component {
    static renderSubCategory(category) {
        const classNamesLink = cl({
            [category.name.toLowerCase()]: true,
        });

        return (
            <li key={category.id}>
                <NavLink
                  to={routes.challenges.type(category.name.toLowerCase())}
                  className={classNamesLink}
                  activeClassName="active"
                >
                    <span className="icon" />{category.name}
                </NavLink>
            </li>
        );
    }

    render() {
        const { categories } = this.props;

        return (
            <div className="left-menu">
                <ul className="main-menu">
                    <li>
                        <NavLink to={routes.news.all()} className="link news">
                            <span className="icon" />News Feed
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/challenges" strict className="link challenges">
                            <span className="icon" />Challenges
                        </NavLink>
                        <ul className="sub-menu">
                            <li>
                                <NavLink
                                  to={routes.challenges.type('all')}
                                  className="challenges"
                                  activeClassName="active"
                                >
                                    <span className="icon" />All categories
                                </NavLink>
                            </li>
                            {categories.map(category => (MenuComponent.renderSubCategory(category)))}
                        </ul>
                    </li>
                    <li>
                        <NavLink to={routes.trophy.all()} className="link trophy">
                            <span className="icon" />Trophy
                        </NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}

MenuComponent.defaultProps = {
    categories: [],
};

MenuComponent.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object),
};

export default MenuComponent;
