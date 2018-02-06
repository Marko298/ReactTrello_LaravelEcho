import React                                     from 'react';
import PropTypes                                 from 'prop-types';
import makeCWRP                                  from "../utils/makeCWRP";
import Table                                     from './Table';
import { connect as connectSocket, updateToken } from "../actions/SocketActions";
import { connect }                               from "react-redux";

class App extends React.Component {
    componentWillReceiveProps = makeCWRP(this, {token: 'input_token'});

    saveToken = (e) => {
        if (e) {
            e.preventDefault();
        }

        this.props.updateToken(this.state.input_token)
    };

    inputTokenChanged = (e) => {
        this.setState({input_token: e.target.value});
    };

    inputTokenStyle = () => {
        return this.state.input_token !== this.props.token ? {color: 'blue'} : {}
    };

    constructor(props) {
        super(props);

        this.state = {
            input_token: this.props.token,
        };
    }

    componentDidMount() {
        this.props.connectSocket();
    }

    render() {
        return (
            <div>
                <div>
                    <form onSubmit={this.saveToken}>
                        <span style={this.inputTokenStyle()}>Current token: </span>
                        <input type="text" value={this.state.input_token} onChange={this.inputTokenChanged}/>
                        <button type="submit">Save</button>
                    </form>
                </div>
                <div>
                    <span>Current status: </span>
                    {
                        this.props.socket_id
                            ? <span style={{
                                width:           '100px',
                                color:           'white',
                                backgroundColor: 'green'
                            }}>Connected</span>
                            : <span style={{
                                width:           '100px',
                                color:           'black',
                                backgroundColor: 'red'
                            }}>Disconnected</span>
                    }
                </div>
                {
                    this.props.socket_id
                    && <span>Socket ID: {this.props.socket_id}</span>
                }
                {
                    this.props.socket_id && <Table/>
                }
            </div>
        )
    }

}


App.propTypes = {
    echo:      PropTypes.shape({}),
    token:     PropTypes.string,
    socket_id: PropTypes.string.isRequired,

    connectSocket: PropTypes.func.isRequired,
    updateToken:   PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        echo:      state.socket.echo,
        token:     state.socket.token,
        socket_id: state.socket.socket_id,
    }
};

const mapDispatchToProps = {
    connectSocket,
    updateToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
