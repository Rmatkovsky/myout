import Base from './config/Base';

import ep from '../constants/endPoints.constant';

class NewsAPI extends Base {
    getAll(params) {
        const url = ep.news.all(params);
        return this.apiClient.get(url);
    }
}

export default NewsAPI;
