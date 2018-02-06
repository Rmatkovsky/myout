import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FilterComponent from '../../challenge/Filter';

import NotificationItemComponent from '../../user/NotificationItem';
import RequestItemComponent from '../../user/RequestItem';

class UserNotificationsPage extends Component {
    renderRequests() {
        const {
            items,
            declined,
            handleAcceptRequest,
            handleDeclineRequest,
        } = this.props;

        return items.map((item) => {
            if (declined.indexOf(item.id) !== -1) {
                return null;
            }
            return (
                <RequestItemComponent
                  item={item}
                  handleAcceptRequest={handleAcceptRequest}
                  handleDeclineRequest={handleDeclineRequest}
                />
            );
        });
    }

    renderNotifications() {
        const { items } = this.props;

        return items.map(item => (
            <NotificationItemComponent item={item} />
        ));
    }

    render() {
        const {
            isRequests,
            filters,
            activeFilter,
            handleSelectFilter,
        } = this.props;

        return (
            <div className="post-notifications__wrap">
                <FilterComponent
                  filters={filters}
                  activeFilter={activeFilter}
                  handleSelectFilter={handleSelectFilter}
                />
                {!isRequests ? this.renderNotifications() : this.renderRequests()}
            </div>
        );
    }
}

UserNotificationsPage.propTypes = {
    declined: PropTypes.arrayOf(PropTypes.number).isRequired,
    isRequests: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    filters: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeFilter: PropTypes.string.isRequired,
    handleSelectFilter: PropTypes.func.isRequired,
    handleAcceptRequest: PropTypes.func.isRequired,
    handleDeclineRequest: PropTypes.func.isRequired,
};

export default UserNotificationsPage;
