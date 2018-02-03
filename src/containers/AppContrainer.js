import App                                       from "../components/App";
import React                                     from "react";
import { connect }                               from "react-redux";
import { connect as socketConnect, updateToken } from "../actions/SocketActions";


const AppContainer = (props) => {
    return <App {...props}/>
};

const mapStateToProps = (state) => {
    return {
        echo:      state.socket.echo,
        token:     state.socket.token,
        socket_id: state.socket.socket_id,
    }
};

const mapDispatchToProps = {
    connect:     socketConnect,
    updateToken: updateToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);