import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
// import 'bootstrap/dist/css/bootstrap.min.css';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { handleReplace } from '../../utils/history.helper';

import { MODAL_POPUP_DOWNLOAD_APP } from '../../constants/modals.constant';
import routes from '../../constants/routes.constant';
import accessFree from '../../constants/accessFree.constant';

import {
    openModal,
    closeModal,
    openExtendModal,
    closeExtendModal,
    getCategories,

} from '../../actions/common.actions';

import {
    userLogout,
    userLoaded,
    setRedirect,
} from '../../actions/user.actions';

import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ModalContainer from '../../containers/modal/Modal.container';
import ExtendModalContainer from '../../containers/modal/ExtendModal.container';

import '../../assets/stylesheets/index.sass';

class Layout extends Component {
    static childContextTypes = {
        closeMenu: PropTypes.bool,
        handleOpenMenu: PropTypes.func,
        handleCloseMenu: PropTypes.func,
        handleOpenModal: PropTypes.func,
        handleOpenExtendModal: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            closeMenu: true,
            connectionStatus: true,
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.handleOpenMenu = this.handleOpenMenu.bind(this);
        this.handleCloseMenu = this.handleCloseMenu.bind(this);
        this.changeConnectionStatus = this.changeConnectionStatus.bind(this);
    }

    getChildContext() {
        const { closeMenu } = this.state;
        const { handleOpenModal, handleOpenExtendModal } = this.props;
        return {
            closeMenu,
            handleCloseMenu: this.handleCloseMenu,
            handleOpenMenu: this.handleOpenMenu,
            handleOpenModal,
            handleOpenExtendModal,
        };
    }

    componentWillMount() {
        const {
            user,
            location: {
                pathname,
            },
            handleUserLoaded,
            handleSetRedirect,
        } = this.props;

        if ((accessFree.indexOf(pathname) === -1 && !user.isAuthorized && user.redirect !== pathname)
            || pathname.indexOf('preview') !== -1) {
            handleSetRedirect(pathname);
            handleUserLoaded(pathname);
            return null;
        }

        handleUserLoaded();
        return null;
    }

    componentDidMount() {
        const { handleOpenModal } = this.props;
        const isDownload = localStorage.getItem('download');

        window.addEventListener('online', this.changeConnectionStatus);
        window.addEventListener('offline', this.changeConnectionStatus);

        if (!isDownload) {
            setTimeout(() => handleOpenModal(MODAL_POPUP_DOWNLOAD_APP), 30000);
            localStorage.setItem('download', true);
        }
    }

    componentWillUpdate(nextProps) {
        const {
            location: {
                pathname,
            },
            handleGetCategories,
        } = nextProps;

        if (nextProps.isAuthorized !== this.props.isAuthorized) {
            handleGetCategories();
        }

        if (nextProps.isAuthorized && accessFree.indexOf(pathname) !== -1 && pathname !== '/signup') {
            handleReplace({ pathname: routes.news.all() });
        }
    }

    changeConnectionStatus() {
        this.setState({ connectionStatus: navigator.onLine });
    }

    handleLogout(e) {
        e.preventDefault();
        this.props.handleUserLogout();
        handleReplace({ pathname: routes.main.home() });
    }

    handleOpenMenu() {
        this.setState({ closeMenu: false });
    }

    handleCloseMenu() {
        const { handleCloseExtendModal } = this.props;
        this.setState({ closeMenu: true });
        handleCloseExtendModal();
    }

    renderContainerExtendModal() {
        const {
            modal,
        } = this.props;

        return modal.extend
            ? <ExtendModalContainer key={modal.data.key} modal={modal} handleCloseModal={this.handleCloseMenu} />
            : null;
    }

    renderContainerModal() {
        const {
            modal,
            handleCloseModal,
        } = this.props;

        return modal.open
            ? <ModalContainer key={modal.data.key} modal={modal} handleCloseModal={handleCloseModal} />
            : null;
    }

    render() {
        const {
            user,
            modal,
            children,
            location,
            categories,
            isAuthorized,
        } = this.props;
        const { connectionStatus } = this.state;
        // remove children property to avoid recursive children nesting
        // const shallowProps = { ...this.props, ...this.state };
        // delete shallowProps.children;
        const classNameDefault = cl('content', {
            blur_content: modal.open,
        });
        const classNameMainContainer = cl('content', {
            blur_content: modal.open,
            hide: modal.extend,
        });
        const classNameInternetConnection = cl('no-connection-mobile visible-xs', {
            hide: connectionStatus,
        });

        return (
            <div
              className="app-layout"
              onClick={this.handleCloseMenu}
            >
                <Header
                  user={user}
                  categories={categories}
                  pathname={location.pathname}
                  handleLogout={this.handleLogout}
                  className={classNameDefault}
                  connectionStatus={connectionStatus}
                />
                <div className={classNameInternetConnection}>
                    No internet connection
                </div>
                <div className={classNameMainContainer}>
                    {React.cloneElement(children)}
                </div>
                {this.renderContainerModal()}
                {this.renderContainerExtendModal()}
                <Footer
                  className={classNameDefault}
                  isAuthorized={isAuthorized}
                />
            </div>
        );
    }
}

Layout.propTypes = {
    location: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    modal: PropTypes.object.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
    handleCloseExtendModal: PropTypes.func.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    handleUserLogout: PropTypes.func.isRequired,
    handleUserLoaded: PropTypes.func.isRequired,
    handleSetRedirect: PropTypes.func.isRequired,
    handleOpenExtendModal: PropTypes.func.isRequired,
    handleOpenModal: PropTypes.func.isRequired,
    handleGetCategories: PropTypes.func.isRequired,

};

const mapStateToProps = (state, ownProps) => ({
    modal: state.common.modal,
    user: state.user,
    isAuthorized: state.user.isAuthorized,
    categories: state.common.categories,
    ...ownProps,
});

const mapDispatchToProps = dispatch => ({
    handleSetRedirect: bindActionCreators(setRedirect, dispatch),
    handleOpenModal: bindActionCreators(openModal, dispatch),
    handleOpenExtendModal: bindActionCreators(openExtendModal, dispatch),
    handleUserLogout: bindActionCreators(userLogout, dispatch),
    handleCloseModal: bindActionCreators(closeModal, dispatch),
    handleCloseExtendModal: bindActionCreators(closeExtendModal, dispatch),
    handleUserLoaded: bindActionCreators(userLoaded, dispatch),
    handleGetCategories: bindActionCreators(getCategories, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
