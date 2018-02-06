import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UserCreditsPage from '../../components/pages/user/Credits.page';

class UserCreditsContainer extends Component {
    render() {
        const { user } = this.props;

        return (
            <UserCreditsPage
              user={user}
            />
        );
    }
}

UserCreditsContainer.propTypes = {
    user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user: state.user.payload,
});

export default connect(mapStateToProps)(UserCreditsContainer);
