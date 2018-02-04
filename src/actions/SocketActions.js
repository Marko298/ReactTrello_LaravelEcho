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
        dispatch({
            type: types.CONNECTED,
            echo: echo,
        });
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
