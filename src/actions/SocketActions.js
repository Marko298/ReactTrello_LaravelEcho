import * as types                      from '../constants/ActionTypes';
import Echo                            from "laravel-echo";
import io                              from 'socket.io-client';
import { SOCKET_HOST }                 from "../constants/ApiConstants";
import { getCardColumn, getCardIndex } from "../selectors/TableSelectors";

export const connect = () => async (dispatch, getState) => {
    const {token} = getState();
    const echo = new Echo({
        auth:        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        },
        host:        SOCKET_HOST,
        broadcaster: 'socket.io',
        client:      io
    });

    const socket = echo
        .connector
        .socket;

    socket.on('connect', () => {
        dispatch({
            type: types.CONNECTED,
            echo: echo,
        });
        dispatch(subscribe());
    });

    socket.on('disconnect', () => {
        dispatch({
            type: types.DISCONNECTED,
        })
    });

    dispatch({
        type: types.CONNECTING,
        echo: echo,
    });

};

export const reconnect = () => async (dispatch) => {
    await dispatch(disconnect());
    await dispatch(connect());
};

export const updateToken = (token) => async (dispatch) => {
    localStorage.setItem('token', token);

    await dispatch({
        type:  types.TOKEN_UPDATED,
        token: token,
    });

    dispatch(reconnect());
};

export const disconnect = () => (dispatch, getState) => {
    const {socket: {echo}} = getState();

    if (echo.connector) {
        echo.connector.disconnect();
    }
};

export const subscribe = () => (dispatch, getState) => {
    const state = getState();

    state
        .socket
        .echo
        .channel('table')
        .listen('CardMoved', (e) => {
            /**
             * @property {object} e
             * @property {int} e.card_id
             * @property {int} e.s_index
             * @property {int} e.d_index
             * @property {int} e.s_column_id
             * @property {int} e.d_column_id
             */

            const state = getState();
            if (getCardColumn(state, e.card_id) !== e.d_column_id || getCardIndex(state, e.card_id) !== e.d_index) {
                dispatch(createServerCardMove(e))
            }
        });

    dispatch({
        type: types.SUBSCRIBED
    })
};

const createServerCardMove = (e) => {

    return {
        type:   types.SERVER_CARD_MOVE,
        cardId: e.card_id,
        sIndex: e.s_index,
        dIndex: e.d_index,
        sColId: e.s_column_id,
        dColId: e.d_column_id,
    };
};