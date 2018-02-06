import React from 'react';
import {
    MODAL_REPORT_POST,
    MODAL_REPORT_SUCCESS,
    MODAL_POPUP_PHOTOS,
    MODAL_CONFIRM_DELETE,
    MODAL_POPUP_DOWNLOAD_APP,
    MODAL_POPUP_SUPPORT,
    MODAL_POPUP_VERIFYING,
    MODAL_POPUP_SUPPORT_SUCCESS,
    MODAL_POPUP_INVINTE_CHALLENGE,
    MODAL_POPUP_FACEBOOK_ERROR,
} from './modals.constant';

// // Auth
import ChallengeReportContainer from '../containers/challenge/Report.container';
import SuccessReportComponent from '../components/modal/challlenge/SuccessReport.component';
import MediaPopupComponent from '../components/modal/challlenge/MediaPopup.component';
import DeleteConfirmPopupComponent from '../components/modal/common/DeleteConfirmPopup.component';
import DownloadAppPopupComponent from '../components/modal/common/AppPopup.component';
import SupportPopupComponent from '../components/modal/common/SupportPopup.component';
import FacebookErrorComponent from '../components/modal/common/FacebookError.component';
// import SupportSuccessPopupComponent from '../components/modal/common/SupportSuccessPopup.component';
import VerifyingPopupComponent from '../components/modal/common/VerifyingPopup.component';
import PostInviteToFriendsContainer from '../containers/user/PostInviteToFriends.container';


const containers = {
    [MODAL_REPORT_POST]: {
        component: <ChallengeReportContainer />,
        className: 'modal-container',
    },
    [MODAL_REPORT_SUCCESS]: {
        component: <SuccessReportComponent />,
        className: 'modal-container text-center',
    },
    [MODAL_POPUP_PHOTOS]: {
        component: <MediaPopupComponent />,
        className: 'modal-media',
    },
    [MODAL_CONFIRM_DELETE]: {
        component: <DeleteConfirmPopupComponent />,
        className: 'modal-container text-center',
    },

    // Ruslan plug-in this popup
    [MODAL_POPUP_VERIFYING]: {
        component: <VerifyingPopupComponent />,
        className: 'modal-container',
    },

    // Ruslan plug-in this popup
    [MODAL_POPUP_SUPPORT]: {
        component: <SupportPopupComponent />,
        className: 'modal-container',
    },

    [MODAL_POPUP_SUPPORT_SUCCESS]: {
        component: <SupportPopupComponent />,
        className: 'modal-container',
    },

    [MODAL_POPUP_DOWNLOAD_APP]: {
        component: <DownloadAppPopupComponent />,
        className: 'modal-container text-center apps',
    },

    [MODAL_POPUP_INVINTE_CHALLENGE]: {
        component: <PostInviteToFriendsContainer />,
        className: 'modal-container',
    },

    [MODAL_POPUP_FACEBOOK_ERROR]: {
        component: <FacebookErrorComponent />,
        className: 'modal-container text-center',
    },
};

export const getContainer = key => containers[key];
