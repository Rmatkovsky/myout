import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

class MediaPopupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: props.value.index,
        };

        this.handleClicPrev = this.handleClicPrev.bind(this);
        this.handleClicNext = this.handleClicNext.bind(this);
    }

    handleClicNext(e) {
        e.stopPropagation();
        const { value: { photos_data } } = this.props;
        const { index } = this.state;

        if (index + 1 >= photos_data.length) {
            this.setState({ index: 0 });
            return null;
        }

        this.setState({ index: index + 1 });
        return null;
    }

    handleClicPrev(e) {
        e.stopPropagation();
        const { value: { photos_data } } = this.props;
        const { index } = this.state;
        if (!index) {
            this.setState({ index: photos_data.length - 1 });
            return null;
        }

        this.setState({ index: index - 1 });
        return null;
    }

    renderVideo() {
        const { value: { video_data } } = this.props;
        const isVertical = video_data.preview.width < video_data.preview.height;
        const classNameMedia = cl('content media', {
            'media-video': !isVertical,
            'media-video-vertical': isVertical,
        });
        return (
            <div className={classNameMedia}>
                <div className="video-container">
                    <video
                      autoPlay
                      playsInline
                      controls
                      controlsList="nodownload"
                      ref={(video) => { this.video = video; }}
                      poster={video_data.preview.url}
                    >
                        <source src={video_data.url} type="video/mp4" />
                    </video>
                </div>
            </div>
        );
    }

    renderPhoto() {
        const { value: { photos_data } } = this.props;
        const { index } = this.state;
        return (
            <div>
                <div className="content">
                    <img src={photos_data[index].preview.url} alt="" onClick={this.handleClicNext} />
                </div>
                {
                    photos_data.length > 1
                        ? <a className="prev" onClick={this.handleClicPrev}><i className="arrow-img left" /></a>
                        : null
                }
                {
                    photos_data.length > 1
                        ? <a className="next" onClick={this.handleClicNext}><i className="arrow-img" /></a>
                        : null
                }
                {photos_data.length > 1 ? <span className="info">{index + 1}/{photos_data.length}</span> : null}
            </div>
        );
    }

    render() {
        const { value: { type } } = this.props;
        return type === 'video' ? this.renderVideo() : this.renderPhoto();
    }
}

MediaPopupComponent.propTypes = {
    value: PropTypes.object.isRequired,
};

export default MediaPopupComponent;
