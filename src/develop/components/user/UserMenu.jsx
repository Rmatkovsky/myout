import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import routes from '../../constants/routes.constant';

class UserMenuComponent extends Component {
    render() {
        const { user, currentUser } = this.props;
        return (
            user.id === currentUser.id
                ?
                    <div className="user-profile__menu">
                        <ul>
                            <li>
                                <NavLink className="user-profile__item" to={routes.user.settings(currentUser.id)}>
                                    <i className="icon-settings" />
                                    Settings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={routes.user.notifications(user.id)} className="user-profile__item">
                                    <i className="icon-notifications" />
                                    Notifications
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="user-profile__item" to={routes.user.credits(currentUser.id)}>
                                    <i className="icon-credits" />
                                    Credits
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    : null
        );
    }
}

UserMenuComponent.propTypes = {
    user: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
};

export default UserMenuComponent;
