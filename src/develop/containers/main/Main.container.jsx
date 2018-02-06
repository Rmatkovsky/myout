import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleReplace } from '../../utils/history.helper';
import routes from '../../constants/routes.constant';

import MainPage from '../../components/pages/main/Main.page';

class MainContainer extends Component {
    componentDidMount() {
        const { user } = this.props;
        if (user.isAuthorized) {
            handleReplace({ pathname: routes.challenges.all() });
        }
    }
    render() {
        const { user } = this.props;

        return (
            <MainPage
              user={user}
            />
        );
    }
}

MainContainer.propTypes = {
    user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user: state.user.payload,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
