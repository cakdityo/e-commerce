import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import routes from 'routes';
import store from '../app/store/configureStore';

require('./styles/app.scss');

ReactDOM.render(
    <Provider store={store(window.INIT_STATE)}>
        {routes}
    </Provider>,
    document.querySelector('#root-container')
);