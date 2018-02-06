import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AttentionComponent from '../../../components/common/Attention';
import FilterComponent from '../../challenge/Filter';
import SearchItemComponent from '../../common/SearchItem';

import userFollowConstants from '../../../constants/userFollow.constants';

class UserFollowPage extends Component {
    render() {
        const { currentUser, filter, handleSelectFilter, followsData } = this.props;

        if (!currentUser) {
            return null;
        }

        return (
            <div>
                <div className="post-filter__wrap m-inline">
                    <FilterComponent
                      activeFilter={filter}
                      filters={userFollowConstants}
                      handleSelectFilter={handleSelectFilter}
                    />
                </div>
                <ul className="search__results__list">
                    {
                        followsData ? followsData.map(item => (
                            <li>
                                <SearchItemComponent item={item} />
                            </li>
                        )) : null
                    }
                </ul>
                {
                    !followsData.length
                        ? <AttentionComponent text={['Sorry, no any users!']} />
                        : null
                }
            </div>
        );
    }
}

UserFollowPage.defaultProps = {
    followsData: [],
};

UserFollowPage.propTypes = {
    filter: PropTypes.string.isRequired,
    currentUser: PropTypes.object.isRequired,
    followsData: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleSelectFilter: PropTypes.func.isRequired,
};

export default UserFollowPage;
