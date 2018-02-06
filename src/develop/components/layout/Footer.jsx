import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MODAL_POPUP_SUPPORT } from '../../constants/modals.constant';

import routes from '../../constants/routes.constant';

class Footer extends PureComponent {

    handleOpenSupportModal(e) {
        const { handleOpenModal } = this.context;

        e.stopPropagation();
        handleOpenModal(MODAL_POPUP_SUPPORT);
    }

    render() {
        const { className } = this.props;

        return (
            <footer className={className}>
                <div className="container">
                    <div className="pull-left">
                        <ul>
                            <li>
                                <Link to={routes.main.about()}>About us</Link>
                            </li>
                            <li>
                                {
                                    !this.props.isAuthorized
                                        ?
                                            <Link to={routes.auth.login()}>
                                            Contact
                                            </Link>
                                        :
                                            <a onClick={this.handleOpenSupportModal.bind(this)}>Contact</a>
                                }
                            </li>
                            <li>
                                <Link to={routes.main.help()}>Help</Link>
                            </li>
                            <li>
                                <Link to={routes.main.privacy()}>Privacy</Link>
                            </li>
                            <li>
                                <Link to={routes.main.terms()}>Terms</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="pull-right">
                        <span className="copyright">
                            OutDoo © 2017
                        </span>
                    </div>
                </div>
            </footer>
        );
    }
}

Footer.defaultProps = {
    className: '',
};

Footer.contextTypes = {
    handleOpenModal: PropTypes.func.isRequired,
};

Footer.propTypes = {
    className: PropTypes.string.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
};

export default Footer;
