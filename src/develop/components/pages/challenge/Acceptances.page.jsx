import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';

import Filter from '../../challenge/Filter';
import AcceptItemComponent from '../../acceptance/AcceptItem';
import filterAcceptances from '../../../constants/filterAcceptances.constant';

class AcceptancesPage extends Component {
    constructor() {
        super();

        this.state = {
            activeFilter: 'latest',
            removeAcceptances: [],
        };

        this.handleSelectFilter = this.handleSelectFilter.bind(this);
    }

    componentWillMount() {
        const { item: { id }, handleGetAcceptances } = this.props;
        const { activeFilter } = this.state;
        handleGetAcceptances({ id, order: activeFilter });
    }

    handleSelectFilter(code) {
        const {
            item: { id },
            handleGetAcceptances,
        } = this.props;

        this.state.activeFilter = code;
        handleGetAcceptances({ id, order: code });
    }

    handleRemoveAcceptance(id) {
        const { removeAcceptances } = this.state;

        removeAcceptances.push(id);
    }

    render() {
        const {
            item,
            user,
            acceptances,
            type,
        } = this.props;
        const { activeFilter, removeAcceptances } = this.state;

        if (_isEmpty(acceptances)) {
            return null;
        }

        return (
            <div className="acceptances">
                <div className="header-title">
                    <span className="title">Challenge accepts</span>
                    <Filter
                      className="acceptance"
                      activeFilter={activeFilter}
                      filters={filterAcceptances}
                      handleSelectFilter={this.handleSelectFilter}
                    />
                </div>
                {
                    acceptances.map((accept) => {
                        if (removeAcceptances.indexOf(accept.id) === -1) {
                            const isDelete =
                                item.type === 'trophy' ?
                                    (
                                        accept.user.id === user.id
                                        && (item.deadline !== 'Evaluation' || _isEmpty(item.winner))
                                    )
                                    : accept.user.id === user.id || item.user.id === user.id;
                            return (
                                <AcceptItemComponent
                                  key={accept.id}
                                  item={accept}
                                  user={user}
                                  type={type}
                                  isDelete={isDelete}
                                  handleRemove={this.handleRemoveAcceptance.bind(this, accept.id)}
                                />
                            );
                        }
                        return null;
                    })
                }
            </div>
        );
    }
}

AcceptancesPage.defaultProps = {
    type: 'acceptance',
};

AcceptancesPage.propTypes = {
    item: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    acceptances: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleGetAcceptances: PropTypes.func.isRequired,
};

export default AcceptancesPage;
