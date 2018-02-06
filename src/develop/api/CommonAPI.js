import Base from './config/Base';

import ep from '../constants/endPoints.constant';

class CommonAPI extends Base {
    getCategories() {
        const url = ep.common.categories();
        return this.apiClient.get(url);
    }
}

export default CommonAPI;
