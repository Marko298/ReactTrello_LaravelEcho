import * as types      from '../constants/ActionTypes';
import Echo            from "laravel-echo";
import io              from 'socket.io-client';
import { SOCKET_HOST } from "../constants/ApiConstants";

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
        dispatch(connected(echo));
    });

    socket.on('disconnect', () => {
        dispatch(disconnected())
    });

    dispatch(connecting(echo));

};

const connecting = (echo) => {
    return {
        type: types.CONNECTING,
        echo: echo,
    }
};

export const reconnect = () => async (dispatch) => {
    await dispatch(disconnect());
    return dispatch(connect());
};

export const updateToken = (token) => async (dispatch) => {
    await dispatch(saveToken(token));
    return dispatch(reconnect());

};

export const disconnect = () => async (dispatch, getState) => {
    const {socket: {echo}} = getState();

    if (echo.hasOwnProperty('connector')) {
        echo.connector.disconnect();
    }
};

const connected = (echo) => {
    return {
        type: types.CONNECTED,
        echo: echo,
    }
};

const disconnected = () => {
    return {
        type: types.DISCONNECTED,
    }
};

const saveToken = (token) => {
    return {
        type:  types.SAVE_TOKEN,
        token: token,
    }
};

