import _isEmpty from 'lodash/isEmpty';

const getVideoData = video => ({
    url: video.url,
    duration: video.duration,
    thumbnail: {
        url: video.thumbnail.url,
        width: video.thumbnail.width,
        height: video.thumbnail.height,
    },
    preview: {
        url: video.preview.url,
        width: video.preview.width,
        height: video.preview.height,
    },
});

const getPhotoData = photo => ({
    full: {
        url: photo.full.url && null,
        width: photo.full.width,
        height: photo.full.height,
    },
    thumbnail: {
        url: photo.thumbnail.url,
        width: photo.thumbnail.width,
        height: photo.thumbnail.height,
    },
    preview: {
        url: photo.preview.url,
        width: photo.preview.width,
        height: photo.preview.height,
    },
});

const getPhotosData = (photos = []) => photos.map(getPhotoData);

const getUser = user => ({
    id: user.id,
    name: user.name,
    avatar_data: user.avatar_data ? {
        thumbnail: {
            url: user.avatar_data.thumbnail.url,
            width: user.avatar_data.thumbnail.width,
            height: user.avatar_data.thumbnail.height,
        },
    } : null,
});

const getComment = comment => ({
    created_at: comment.created_at,
    id: comment.id,
    post_id: comment.post_id,
    liked_by_me: comment.liked_by_me,
    likes_count: comment.likes_count,
    text: comment.text,
    user: getUser(comment.user),
});

const getComments = (comments = []) => comments.map(getComment);

const getAcceptance = acceptance => ({
    id: acceptance.id,
    parent_id: acceptance.parent_id,
    video_data: !_isEmpty(acceptance.video_data) ? getVideoData(acceptance.video_data) : {},
    photos_data: !_isEmpty(acceptance.photos_data) ? getPhotosData(acceptance.photos_data) : [],
    title: acceptance.title,
    description: acceptance.description,
    created_at: acceptance.created_at,
    comments_count: acceptance.comments_count,
    likes_count: acceptance.likes_count,
    liked_by_me: acceptance.liked_by_me,
    views_count: acceptance.views_count,
    comments: acceptance.comments || [],
    user: getUser(acceptance.user),
});

const getAcceptances = (acceptances = []) => acceptances.map(getAcceptance);

const getTrophy = (post) => {
    if (post.type !== 'trophy') {
        return {
            type: post.type,
        };
    }
    return {
        id: post.id,
        acceptance_cost: post.acceptance_cost,
        parent_id: post.parent_id,
        deadline: post.deadline,
        type: post.type,
        category_id: post.category_id,
        title: post.title || '',
        description: post.description || '',
        created_at: post.created_at,
        video_data: !_isEmpty(post.video_data) ? getVideoData(post.video_data) : {},
        photos_data: !_isEmpty(post.photos_data) ? getPhotosData(post.photos_data) : [],
        prize_photo_data: !_isEmpty(post.prize_photo_data) ? getPhotoData(post.prize_photo_data) : [],
        views_count: post.views_count,
        likes_count: post.likes_count,
        comments_count: post.comments_count,
        accepted_count: post.accepted_count,
        // user: getUser(post.user),
        liked_by_me: post.liked_by_me,
        comments: getComments(post.comments),
        winner: !_isEmpty(post.winner) ? getUser(post.winner) : {},
        prize: post.prize,
    };
};

const getTrophies = (posts = []) => posts.map(getTrophy);

export default {
    req: {},
    res: {
        getComment,
        getTrophies,
        getTrophy,
        getAcceptances,
    },
};
