import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cl from 'classnames';

import FilterComponent from '../../challenge/Filter';

import AvatarComponent from '../../../components/challenge/Avatar';

import routes from '../../../constants/routes.constant';

class InvitePostPage extends Component {
    constructor() {
        super();

        this.state = {
            challenged: [],
        };

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        const { handleCloseModal } = this.props;

        handleCloseModal();
    }

    handleInvite(item) {
        const { handleSendInvite } = this.props;
        const { challenged } = this.state;

        if (challenged.indexOf(item.id) === -1) {
            handleSendInvite(item.id);
            challenged.push(item.id);
            this.setState({ challenged });
        }
    }

    render() {
        const {
            filters,
            filter,
            handleSelectFilter,
            items,
        } = this.props;
        const { challenged } = this.state;

        return (
            <div className="main-container">
                <div className="post-filter__wrap m-inline">
                    <FilterComponent
                      filters={filters}
                      activeFilter={filter}
                      handleSelectFilter={handleSelectFilter}
                    />
                </div>
                <div className="invite-chal__container clearfix">
                    <div className="close" onClick={this.handleClose} />
                    {
                        items.map((item) => {
                            const isChallenged = challenged.indexOf(item.id) !== -1;
                            const classNameButton = cl('btn-accent', {
                                disabled: isChallenged,
                            });
                            const textButton = isChallenged ? 'Challenged' : 'Challenge';

                            return (
                                <div className="invite-chal__col">
                                    <div className="invite-chal__item clearfix">
                                        <Link to={routes.user.id(item.id)}>
                                            <AvatarComponent
                                              classname="invite-chal__avatar"
                                              img={item.avatar_data}
                                            />
                                            <div className="invite-chal__name">{item.name}</div>
                                        </Link>
                                        <button
                                          className={classNameButton}
                                          onClick={this.handleInvite.bind(this, item)}
                                        >
                                            {textButton}
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

InvitePostPage.defaultProps = {
    items: [],
};

InvitePostPage.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.object).isRequired,
    filter: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    handleSelectFilter: PropTypes.func.isRequired,
    handleSendInvite: PropTypes.func.isRequired,
};

export default InvitePostPage;
