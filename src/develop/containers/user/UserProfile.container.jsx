import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UserProfilePage from '../../components/pages/user/UserProfile.page';

import { getUserById, clearTempDataState } from '../../actions/user.actions';

class UserProfileContainer extends Component {
    componentWillMount() {
        const {
            handleGetUser,
            match: { params },
        } = this.props;

        handleGetUser({ id: params.id });
    }

    componentWillReceiveProps(nextProps) {
        const {
            handleGetUser,
            handleClearTempDataState,
            match: { params },
        } = this.props;

        if (nextProps.match.params.id !== params.id) {
            handleClearTempDataState();
            handleGetUser({ id: nextProps.match.params.id });
        }
    }

    render() {
        const { user } = this.props;

        return user
            ? (
                <UserProfilePage
                  currentUser={user.current}
                  user={user.payload}
                />
            )
            : null;
    }
}

UserProfileContainer.propTypes = {
    user: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    handleGetUser: PropTypes.func.isRequired,
    handleClearTempDataState: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    handleGetUser: bindActionCreators(getUserById, dispatch),
    handleClearTempDataState: bindActionCreators(clearTempDataState, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);

