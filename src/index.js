import React                 from 'react';
import ReactDOM              from 'react-dom';
import { Provider }          from "react-redux";
import configureStore        from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import AppContainer          from './containers/AppContrainer';
import './styles/index.css'


ReactDOM.render(
    <Provider store={configureStore()}>
        <AppContainer/>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
