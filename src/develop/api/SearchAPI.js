import Base from './config/Base';

import ep from '../constants/endPoints.constant';

class SearchAPI extends Base {
    getUsersSearch(params) {
        const url = ep.search.users();
        return this.apiClient.get(url, params);
    }

    getChallengesSearch(params) {
        const url = ep.search.challenges();
        return this.apiClient.get(url, params);
    }
}

export default SearchAPI;
