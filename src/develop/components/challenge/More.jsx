import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import { FacebookButton } from 'react-social';
import _isEmpty from 'lodash/isEmpty';

import config from '../../config/apiConfig';

import DeletePostContainer from '../../containers/challenge/Delete.container';

import { MODAL_POPUP_INVINTE_CHALLENGE, MODAL_REPORT_POST } from '../../constants/modals.constant';

import { copyInBuffer } from '../../utils/helper';

class MoreComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openMore: false,
            openReport: false,
            openShare: false,
        };

        this.handleOpenMore = this.handleOpenMore.bind(this);
        this.handleOpenReport = this.handleOpenReport.bind(this);
        this.handleOpenShare = this.handleOpenShare.bind(this);
        this.handleCopyLink = this.handleCopyLink.bind(this);
        this.handleOpenInviteChallenge = this.handleOpenInviteChallenge.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const { closeMenu } = nextContext;

        if (closeMenu) {
            this.handleRestoreToDefaultState();
        }
    }

    handleOpenMore(e) {
        const { handleOpenMenu } = this.context;
        e.stopPropagation();

        this.setState({ openMore: true });
        handleOpenMenu();
    }

    handleOpenReport(e) {
        const { handleOpenMenu } = this.context;
        e.stopPropagation();

        this.setState({ openReport: true });
        handleOpenMenu();
    }

    handleOpenShare(e) {
        const { handleOpenMenu } = this.context;
        e.stopPropagation();

        this.setState({ openShare: true });
        handleOpenMenu();
    }

    handleOpenModalReport(spam = false) {
        const { challenge, type } = this.props;
        const { handleOpenModal } = this.context;
        handleOpenModal(MODAL_REPORT_POST, { item: challenge, type, spam });
    }

    handleCopyLink(e) {
        const { challenge } = this.props;
        const { handleCloseMenu } = this.context;

        e.stopPropagation();
        copyInBuffer(`shareLink${challenge.id}`);
        handleCloseMenu();
    }

    handleRestoreToDefaultState() {
        this.setState({ openMore: false, openReport: false, openShare: false });
    }

    handleOpenInviteChallenge(e) {
        const { challenge } = this.props;
        const { handleOpenExtendModal } = this.context;
        // const position = document.getElementById(challenge.id).getBoundingClientRect().top;
        // let documentElement = document.documentElement;

        e.stopPropagation();

        handleOpenExtendModal(MODAL_POPUP_INVINTE_CHALLENGE, {
            item: challenge,
            // callback: () => { document.documentElement.scrollTop = position; },
        });
    }

    render() {
        const {
            openMore,
            openReport,
            openShare,
        } = this.state;
        const {
            user,
            type,
            challenge,
            isDelete,
            handleRemove,
        } = this.props;
        const { closeMenu, handleCloseMenu } = this.context;
        const classNameMore = cl('more-menu', {
            active: openMore && !closeMenu && !openReport && !openShare,
        });
        const classNameReport = cl('more-menu', {
            active: !closeMenu && openReport,
        });
        const classNameShare = cl('more-menu', {
            active: !closeMenu && openShare,
        });
        const classNameBlur = cl('more-menu-mask', {
            active: openMore,
        });
        const postUrl = `${window.location.origin}/${type}/preview/${challenge.id}`;
        const isDeadlineTrophy =
            type === 'trophy' ? challenge.deadline === 'Evaluation' || !_isEmpty(challenge.winner) : false;

        return (
            <div className="more" onClick={this.handleOpenMore}>
                <div className={classNameBlur} onClick={(e) => { e.stopPropagation(); handleCloseMenu(); }} />
                <ul className={classNameMore}>
                    {
                        (type === 'trophy' || type === 'challenge') && !isDeadlineTrophy
                        ? <li onClick={this.handleOpenInviteChallenge}>
                            Challenge
                          </li>
                        : null
                    }
                    <li onClick={this.handleOpenShare}>
                        Share
                    </li>
                    {
                        !challenge.user || (challenge.user && (user.id !== challenge.user.id))
                            ? <li onClick={this.handleOpenReport}>Report</li>
                            : null
                    }
                    {
                        isDelete ?
                            <li>
                                <DeletePostContainer
                                  type={type}
                                  isDelete={isDelete}
                                  item={challenge}
                                  handleCustomRemove={handleRemove}
                                />
                            </li>
                            : null
                    }
                </ul>
                {
                    !challenge.user || (challenge.user && user.id !== challenge.user.id)
                        ?
                            <ul className={classNameReport}>
                                <li onClick={this.handleOpenModalReport.bind(this, true)}>
                                    It&#39;s spam
                                </li>
                                <li onClick={this.handleOpenModalReport.bind(this, false)}>
                                    It&#39;s inappropriate
                                </li>
                            </ul>
                        : null
                }
                {
                    <ul className={classNameShare}>
                        <li onClick={this.handleCopyLink}>
                            Copy link
                            <input
                              className="clipboard"
                              type="text"
                              value={postUrl}
                              id={`shareLink${challenge.id}`}
                            />
                        </li>
                        <li onClick={this.handleCopyLink}>
                            <FacebookButton url={postUrl} className="facebook-btn" appId={config.fbApp}>
                                Share to Facebook
                            </FacebookButton>
                        </li>
                    </ul>
                }
            </div>
        );
    }
}

MoreComponent.contextTypes = {
    handleOpenMenu: PropTypes.func.isRequired,
    handleCloseMenu: PropTypes.func.isRequired,
    handleOpenModal: PropTypes.func.isRequired,
    handleOpenExtendModal: PropTypes.func.isRequired,
    closeMenu: PropTypes.bool.isRequired,
};

MoreComponent.defaultProps = {
    handleRemove: () => {},
};

MoreComponent.propTypes = {
    user: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    isDelete: PropTypes.bool.isRequired,
    challenge: PropTypes.object.isRequired,
    handleRemove: PropTypes.func,
};

export default MoreComponent;
