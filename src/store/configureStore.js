import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware                  from 'redux-thunk';
import Immutable                        from 'immutable';
import rootReducer                      from '../reducers/index';
import { createLogger }                 from "redux-logger";
import { composeWithDevTools }          from "redux-devtools-extension";
import immutableDevTools                from "immutable-devtools";

immutableDevTools(Immutable);

const middleware = [
    thunkMiddleware,
    createLogger({
        collapsed: (getState, action, logEntry) => !logEntry.error
    }),
];

const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(...middleware))(createStore);

export default function (initialState) {
    return createStoreWithMiddleware(rootReducer, initialState);
}