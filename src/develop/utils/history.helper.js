import qs from 'query-string';

import appHistory from '../config/appHistory';
import { mandatory } from './validation.helper';
import { isEmpty } from './helper';

const createLocationObject = ({ pathname, search, state, hash }, mandatoryField) => {
    const locationObject = {};

    if (pathname) {
        locationObject.pathname = pathname;
    }

    if (search) {
        locationObject.search = search;
    }

    if (state) {
        locationObject.state = state;
    }

    if (hash) {
        locationObject.hash = hash;
    }


    if (isEmpty(locationObject)) {
        mandatory(mandatoryField);
    }

    return locationObject;
};

export const handlePush = (location) => {
    const locationObject = createLocationObject(location, 'handlePush');
    appHistory.push(locationObject);
};

export const handlePushQueryParams = (queryParams) => {
    const { pathname } = window.location;
    const location = {
        pathname,
        search: `?${qs.stringify(queryParams)}`,
    };

    handlePush(location);
};

export const handleReplace = (location) => {
    const locationObject = createLocationObject(location, 'handleReplace');

    appHistory.replace(locationObject);
};

export const handleBack = () => {
    appHistory.goBack();
};

