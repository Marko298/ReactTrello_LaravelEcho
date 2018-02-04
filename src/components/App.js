import React     from 'react';
import PropTypes from 'prop-types';
import makeCWRP  from "../utils/makeCWRP";
import Table     from './Table';

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
    isTokenChanged = () => {
        return this.state.input_token !== this.props.token
    };

    constructor(props) {
        super(props);

        this.state = {
            input_token: this.props.token,
        };

        //         .echo
        //         .channel('some-channel')
        //         .listen('.', (data) => {
        //             console.log(data);
        //             this.setState({messages: [...this.state.messages, data.project.name]})
        //         })
        // });
    }

    componentDidMount() {
        this.props.connect('')
    }

    render() {
        return (
            <div>
                <div>
                    <form onSubmit={this.saveToken}>
                        <span style={this.isTokenChanged() ? {color: 'blue'} : {}}>Current token: </span>
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

    connect:     PropTypes.func.isRequired,
    updateToken: PropTypes.func.isRequired,
};

App.defaultProps = {
    token: ''
};

export default App;
