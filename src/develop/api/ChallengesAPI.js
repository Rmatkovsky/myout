import Base from './config/Base';

import ep from '../constants/endPoints.constant';

class ChallengesAPI extends Base {

    getAll(params) {
        const url = ep.challenges.all(params);
        return this.apiClient.get(url);
    }

    getByType(params) {
        const url = ep.challenges.typeId(params);
        return this.apiClient.get(url);
    }

    getById(id) {
        const url = ep.challenge.getById(id);
        return this.apiClient.get(url);
    }

    getAcceptances(params) {
        const url = ep.challenge.getAcceptances(params);
        return this.apiClient.get(url);
    }

    sendReport(params) {
        const url = ep.challenge.report();
        return this.apiClient.post(url, params);
    }

    setLike(id) {
        const url = ep.challenge.like(id);
        return this.apiClient.post(url);
    }

    unsetLike(id) {
        const url = ep.challenge.like(id);
        return this.apiClient.delete(url);
    }

    delete(id) {
        const url = ep.challenge.delete(id);
        return this.apiClient.delete(url);
    }

    deleteAll(params) {
        const url = ep.challenge.deleteAll();
        return this.apiClient.delete(url, { ids: params.ids });
    }

    sendInvite(params) {
        const url = ep.challenge.sendInvite(params.id);
        return this.apiClient.post(url, { receiver_ids: [params.receiver] });
    }
}

export default ChallengesAPI;
