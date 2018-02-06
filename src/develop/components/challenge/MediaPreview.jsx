import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import cl from 'classnames';

import { MODAL_POPUP_PHOTOS } from '../../constants/modals.constant';

class MediaPreviewComponent extends Component {
    constructor() {
        super();

        this.handleClickVideo = this.handleClickVideo.bind(this);
    }

    handleClickVideo(index) {
        const { handleOpenModal } = this.context;
        const { item: { video_data } } = this.props;

        handleOpenModal(MODAL_POPUP_PHOTOS, { index, video_data, type: 'video' });
    }

    handleClickPhoto(index) {
        const { handleOpenModal } = this.context;
        const { item: { photos_data } } = this.props;

        handleOpenModal(MODAL_POPUP_PHOTOS, { index, photos_data, type: 'photo' });
    }

    renderPhotos() {
        const { item } = this.props;
        const classNamePhotosGrid = cl({
            [`photos-grid-${item.photos_data.length}`]: true,
        });
        return (
            <div className={classNamePhotosGrid}>
                {
                    item.photos_data.map((i, k) => {
                        const classNameGrid = cl('photo-item', {
                            [`grid-${k + 1}`]: true,
                            // 'max-width': i.preview.width <= i.preview.height  && i.preview.width <= 600,
                            // 'max-height': i.preview.width / i.preview.height > 1.5 && i.preview.width > i.preview.height,
                        });
                        return (
                            <div
                              key={i.preview.url}
                              className={classNameGrid}
                              onClick={this.handleClickPhoto.bind(this, k)}
                            >
                                <img src={i.preview.url} alt="challenge photos" />
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    renderVideo() {
        const { item } = this.props;

        return (
            <div onClick={this.handleClickVideo} className="video-container">
                <div className="video-preview" />
                <video playsInline poster={item.video_data.preview.url} />
            </div>
        );
    }

    render() {
        const { item } = this.props;
        const isVideo = _isEmpty(item.photos_data);
        const isPhoto = _isEmpty(item.video_data) && item.photos_data.length === 1;
        const isVertical = isVideo ? item.video_data.preview.width < item.video_data.preview.height : false;
        const isVerticalPhoto = isPhoto ?
            item.photos_data[0].preview.width < item.photos_data[0].preview.height : false;
        const classNameMedia = cl('media', {
            'media-video': isVideo && !isVertical,
            'media-photo': !isVideo,
            'media-photo-vertical': isPhoto && isVerticalPhoto,
            'media-video-vertical': isVideo && isVertical,
        });

        return (
            <div className={classNameMedia}>
                { (isVideo) ? this.renderVideo() : this.renderPhotos() }
            </div>
        );
    }
}

MediaPreviewComponent.propTypes = {
    item: PropTypes.object.isRequired,
};

MediaPreviewComponent.contextTypes = {
    handleOpenModal: PropTypes.func.isRequired,
};

export default MediaPreviewComponent;
