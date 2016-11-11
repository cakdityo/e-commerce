import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import routes from 'routes';
import store from '../app/store/configureStore';


ReactDOM.render(
    <Provider store={store(window.INIT_STATE)}>
        {routes}
    </Provider>,
    document.getElementById('app')
);