import Base from './config/Base';

import ep from '../constants/endPoints.constant';

class TrophyAPI extends Base {
    getAll(params) {
        const url = ep.trophy.all(params);
        return this.apiClient.get(url);
    }
}

export default TrophyAPI;
