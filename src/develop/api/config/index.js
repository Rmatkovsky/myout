import apiConfig from '../../config/apiConfig';
import ApiClient from './ApiClient';

import UserAPI from '../UserAPI';
import ChallengesAPI from '../ChallengesAPI';
import CommonAPI from '../CommonAPI';
import CommentAPI from '../CommentAPI';
import NewsAPI from '../NewsAPI';
import TrophyAPI from '../TrophyAPI';
import SearchAPI from '../SearchAPI';

function apiFactory({ baseURL }) {
    const api = new ApiClient({ baseURL });

    return {
        user: new UserAPI({ apiClient: api }),
        challenges: new ChallengesAPI({ apiClient: api }),
        common: new CommonAPI({ apiClient: api }),
        comment: new CommentAPI({ apiClient: api }),
        news: new NewsAPI({ apiClient: api }),
        trophy: new TrophyAPI({ apiClient: api }),
        search: new SearchAPI({ apiClient: api }),
    };
}

export default apiFactory({
    baseURL: apiConfig.apiUrl,
});
