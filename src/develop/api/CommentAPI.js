import Base from './config/Base';

import ep from '../constants/endPoints.constant';

class CommentAPI extends Base {
    addComment(params) {
        const { id, text } = params;
        const url = ep.comment.add(id);
        return this.apiClient.post(url, { text });
    }

    deleteComment(id) {
        const url = ep.comment.delete(id);
        return this.apiClient.delete(url);
    }

    setLike(id) {
        const url = ep.comment.like(id);
        return this.apiClient.post(url);
    }

    unsetLike(id) {
        const url = ep.comment.like(id);
        return this.apiClient.delete(url);
    }
}

export default CommentAPI;
