import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ChallengeComponent from '../challenge/ViewItem';
import TrophyItemComponent from '../trophy/TrophyItem';
import AttentionComponent from '../common/Attention';

import UserInfoMobileComponent from '../user/UserInfoMobile';

import FilterComponent from '../challenge/Filter';

class UserOwnPostsComponent extends Component {
    render() {
        const {
            currentUser,
            posts,
            categories,
            activeFilter,
            userFilters,
            handleSelectFilter,
        } = this.props;

        return (
            <div>
                <UserInfoMobileComponent user={currentUser} />
                {
                    ((currentUser.private && currentUser.followed_by_me !== false) || !currentUser.private)
                        ?
                            <div className="post-filter__wrap m-dropdown m-unfix">
                                <FilterComponent
                                  activeFilter={activeFilter}
                                  filters={userFilters}
                                  handleSelectFilter={handleSelectFilter}
                                />
                            </div>
                        : ''
                }
                {
                    ((currentUser.private && currentUser.followed_by_me !== false) || !currentUser.private)
                        ? posts.map(item => (
                            item.type === 'trophy'
                                ? <TrophyItemComponent user={currentUser} item={item} />
                                : <ChallengeComponent
                                  key={JSON.stringify(item)}
                                  user={currentUser}
                                  item={item}
                                  categories={categories}
                                  handleRemove={() => {}}
                                />
                        ))
                        : <AttentionComponent text={['Sorry, this profile is private!']} />
                }
                {
                    !posts.length && ((currentUser.private && currentUser.followed_by_me) || !currentUser.private)
                        ? <AttentionComponent
                          text={[
                              'Sorry, there are no results matching this criteria.',
                              <br />,
                              'Please try other options',
                          ]}
                        />
                        : null
                }
            </div>
        );
    }
}

UserOwnPostsComponent.propTypes = {
    currentUser: PropTypes.object.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeFilter: PropTypes.string.isRequired,
    userFilters: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleSelectFilter: PropTypes.func.isRequired,
};

export default UserOwnPostsComponent;
