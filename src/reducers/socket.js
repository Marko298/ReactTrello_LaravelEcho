import * as types  from '../constants/ActionTypes';
import * as states from '../constants/SocketStates';

const initialState = {
    echo:      {},
    token:     localStorage.getItem('token'),
    socket_id: '',
    state:     states.DISCONNECTED
};


const socket = (state = initialState, action) => {
    switch (action.type) {
        case types.CONNECTED:
            return {
                ...state,
                echo:      action.echo,
                state:     states.CONNECTED,
                socket_id: action.echo.socketId(),
            };

        case types.CONNECTING:
            return {
                ...state,
                echo:  action.echo,
                state: states.CONNECTING,
            };

        case types.DISCONNECTED:
            return {
                ...state,
                echo:      initialState.echo,
                state:     initialState.state,
                socket_id: initialState.socket_id,
            };

        case types.SAVE_TOKEN:
            return {
                ...state,
                token: action.token
            };

        default:
            return state;
    }
};

export default socket;
