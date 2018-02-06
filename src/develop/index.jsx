require('babel-polyfill');
/* eslint-disable import/first */
import React from 'react';
import { render } from 'react-dom';
import Spinner from './components/common/Spinner';
import { LazyCall } from './utils/moduleImport.helper';

if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line global-require
    require('./app').default();
} else {
    LazyCall(System.import('./app'));
    render(<Spinner />, document.getElementById('r-view'));
}
