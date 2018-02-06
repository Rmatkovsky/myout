import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducer as form } from 'redux-form';
/**
 * Reducers
 */
import user from './user.reducer';
import common from './common.reducer';
import api from './api.reducer';
import challenges from './challenges.reducer';
import news from './news.reducer';
import trophy from './trophy.reducer';
import search from './search.reducer';
import acceptance from './acceptance.reducer';

const rootReducer = combineReducers({
    acceptance,
    user,
    common,
    api,
    form,
    challenges,
    news,
    trophy,
    search,
});

export default rootReducer;
