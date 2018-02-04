import React                 from 'react';
import ReactDOM              from 'react-dom';
import { Provider }          from "react-redux";
import configureStore        from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import App                   from "./components/App";
import './styles/index.css'


ReactDOM.render(
    <Provider store={configureStore()}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
