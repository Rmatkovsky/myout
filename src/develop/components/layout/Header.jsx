import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import { Link, NavLink } from 'react-router-dom';

import routes from '../../constants/routes.constant';
import AvatarComponent from '../../components/challenge/Avatar';
import SearchContainer from '../../containers/user/Search.container';

class Header extends Component {
    static renderSubCategory(category) {
        const classNamesLink = cl({
            [`item-${category.name.toLowerCase().replace(' ', '')}`]: true,
        });

        return (
            <li key={JSON.stringify(category)}>
                <NavLink className={classNamesLink} to={routes.challenges.type(category.name.toLowerCase())}>
                    <i className="main-menu__icon" />
                    {category.name}
                </NavLink>
            </li>
        );
    }

    constructor() {
        super();

        this.state = {
            openMenu: false,
            openHamburger: false,
            openSubCat: false,
            timeOutInstance: null,
        };

        this.handleCloseMenu = this.handleCloseMenu.bind(this);
        this.handlerOpenMenu = this.handlerOpenMenu.bind(this);
        this.handlerOpenHamburger = this.handlerOpenHamburger.bind(this);
        this.handleOpenSubCat = this.handleOpenSubCat.bind(this);
        this.handleCloseSubCat = this.handleCloseSubCat.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { closeMenu } = nextContext;

        if (closeMenu) {
            this.state = {
                openMenu: false,
                openHamburger: false,
                openSubCat: false,
            };
        }
        return true;
    }

    handleOpenSubCat(e) {
        const { handleOpenMenu } = this.context;
        e.stopPropagation();
        this.setState({ openSubCat: true });
        handleOpenMenu();
    }

    handleCloseSubCat(e) {
        const { handleOpenMenu } = this.context;
        e.stopPropagation();
        this.setState({ openSubCat: false });
        handleOpenMenu();
    }

    handleCloseMenu(e) {
        e.stopPropagation();
        this.state.timeOutInstance = setTimeout(() => {
            this.setState({ openMenu: false });
        }, 100);
    }

    handlerOpenMenu(e) {
        const { handleOpenMenu } = this.context;
        const { timeOutInstance } = this.state;
        e.stopPropagation();
        clearTimeout(timeOutInstance);
        this.setState({ openMenu: true, openHamburger: false });
        return handleOpenMenu();
    }

    handlerOpenHamburger(e) {
        const { handleOpenMenu } = this.context;

        e.stopPropagation();
        this.setState({ openHamburger: !this.state.openHamburger, openMenu: false });
        return handleOpenMenu();
    }

    renderAuthorized() {
        const {
            user,
            handleLogout,
            categories,
            pathname,
            connectionStatus,
        } = this.props;
        const { closeMenu } = this.context;
        const { openMenu, openHamburger, openSubCat } = this.state;
        const classNameLogginedMenu = cl('loggined-menu', {
            show: !closeMenu && openMenu,
        });
        const classNameHamburger = cl('main-menu', {
            show: !closeMenu && openHamburger,
        });
        const classNameSubCategories = cl('main-menu__list challenges', {
            disabled: closeMenu || !openSubCat,
        });
        const classNameMainMenu = cl('main-menu__list general', {
            disabled: closeMenu || openSubCat,
        });

        return [(
            <div className="header__loggined">
                <div className="header__loggined__toolbar">
                    { connectionStatus ? <SearchContainer closeMenu={closeMenu} pathname={pathname} /> : '' }
                    <NavLink to={routes.user.notifications(user.payload.id)} className="notification" />
                </div>
                <AvatarComponent
                  img={user.payload.avatar_data}
                  classname="avatar"
                  handleClick={this.handlerOpenMenu}
                />
            </div>
        ),
        (
            <div className={classNameHamburger}>
                <SearchContainer closeMenu={closeMenu} pathname={pathname} />
                <ul className={classNameMainMenu}>
                    <li>
                        <NavLink to={routes.news.all()}>
                            <i className="main-menu__icon icon-feed" />
                            News Feed
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={routes.challenges.all()} className="change-chal-list">
                            <i className="main-menu__icon icon-challenges" />
                            Challenges
                        </NavLink>
                        <div className="go-chal" onClick={this.handleOpenSubCat}>
                            All Categories
                            <i className="icon-arrow-right" />
                        </div>
                    </li>
                    <li>
                        <NavLink to={routes.trophy.all()}>
                            <i className="main-menu__icon icon-trophy" />
                            Trophy
                        </NavLink>
                    </li>
                </ul>
                <ul className={classNameSubCategories}>
                    <li onClick={this.handleCloseSubCat}>
                        <a className="change-chal-list">
                            <i className="main-menu__icon icon-arrow-left" />
                            Challenges
                        </a>
                    </li>
                    <li>
                        <NavLink
                          to={routes.challenges.type('all')}
                        >
                            <i className="main-menu__icon icon-challenges" />
                            All categories
                        </NavLink>
                    </li>
                    {categories.map(category => (Header.renderSubCategory(category)))}
                </ul>
            </div>
        ),
        (
            <div
              className={classNameLogginedMenu}
              onMouseOver={this.handlerOpenMenu}
              onMouseLeave={this.handleCloseMenu}
            >
                <ul>
                    <li>
                        <NavLink to={routes.user.id(user.payload.id)}>
                            <i className="loggined-menu__icon icon-user" />
                            User profile
                        </NavLink>
                    </li>
                    <li>
                        <a>
                            <i className="loggined-menu__icon icon-direct" />
                            Trophy Direct
                        </a>
                    </li>
                    <li>
                        <NavLink to={routes.user.credits(user.payload.id)}>
                            <i className="loggined-menu__icon icon-credits" />
                            Credits
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={routes.user.notifications(user.payload.id)}>
                            <i className="loggined-menu__icon icon-notifications" />
                            Notifications
                        </NavLink>
                        <i className="loggined-menu__icon icon-notifications-exist" />
                    </li>
                    <li>
                        <NavLink to={routes.user.settings(user.payload.id)}>
                            <i className="loggined-menu__icon icon-settings" />
                            Settings
                        </NavLink>
                    </li>
                    <li>
                        <a onClick={handleLogout}>
                            <i className="loggined-menu__icon icon-logout" />
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
            )];
    }

    renderUnauthorized() {
        const { pathname } = this.props;
        switch (pathname) {
            case routes.auth.login():
                return (
                    <div className="header__registration">
                        <span>
                            No account yet?
                            &nbsp;<Link className="header__registration__link" to={routes.auth.signup()}>Create</Link>
                        </span>
                    </div>
                );
            default:
                return (
                    <div className="header__registration">
                        <span>
                            Already have an account?
                            &nbsp;<Link className="header__registration__link" to={routes.auth.login()}>Log In</Link>
                        </span>
                    </div>
                );
        }
    }

    render() {
        const { user, className, pathname, connectionStatus } = this.props;
        const { closeMenu } = this.context;
        const { openMenu, openHamburger } = this.state;
        const classNameHeaderNav = cl('header__nav', {
            show: !closeMenu && (openHamburger || openMenu),
        });
        const classNameHumburger = cl('header__hamburger', {
            hide: !user.isAuthorized,
        });
        const classNameInternetConnection = cl('header__no-connection hidden-xs', {
            hide: connectionStatus,
        });
        const classNameGoBack = cl('header__back', {
            hide: true,
        });


        return (
            <header className={className}>
                <nav className={classNameHeaderNav}>
                    <div className="container">
                        {
                        user.isAuthorized || pathname.indexOf('preview') !== -1
                            ? <Link to={routes.main.home()}>
                                <div className="header__logo" />
                            </Link>
                            : null
                    }
                        <div className={classNameHumburger} onClick={this.handlerOpenHamburger} />
                        <div className={classNameGoBack} />

                        <div className={classNameInternetConnection}>
                            <i className="no-connection-icon" />
                            No internet connection
                        </div>
                        {
                            user.isAuthorized
                                ? this.renderAuthorized()
                                : this.renderUnauthorized()
                        }
                    </div>
                </nav>
            </header>
        );
    }
}

Header.contextTypes = {
    handleOpenMenu: PropTypes.func.isRequired,
    closeMenu: PropTypes.bool.isRequired,
};

Header.propTypes = {
    className: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
    connectionStatus: PropTypes.func.isRequired,
};

export default Header;
