'use strict';

import MainMenu from './mainmenu';
import Home from './home';
import GameModes from './gamemodes';
import Casual from './casual';
import Profile from "./profile";
import TimeTrial from './timetrial';

const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token: null,
            page: "home"
        }
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogin(e, username, password) {
        fetch('http://localhost:8080/auth', {
            method: 'post',
            headers: {
                'username': username,
                'password': password
            }
        }).then(response => {
            switch (response.status) {
                case 200:
                    response.text().then(response => this.setState({ token: response }));
                    this.handlePageChange(e, "play");
                    break;
                default:
                    // TODO: Handle errors
                    alert(`HTTP Status Code: ${response.status}`);
                    break;
            }
        })
    }

    handleLogout(e) {
        this.handlePageChange(e, "home");
        fetch('http://localhost:8080/logout', {
            method: 'post',
            headers: {
                'userToken': this.state.token
            }
        }).then(
            this.setState({
                token: null
            })
        );
        this.handlePageChange(e, "home");
    }

    handlePageChange(e, page) {
        this.setState({
            page: page === null ? e.target.dataset.page : page
        })
    }

    render() {
        const token = this.state.token;
        const page = this.state.page;
        return (
            <div>
                <MainMenu token={token} handleLogout={this.handleLogout} handleLogin={this.handleLogin} handlePageChange={this.handlePageChange}/>
                {
                    page === "home" &&
                    <Home handlePageChange={this.handlePageChange} handleLogin={this.handleLogin} />
                }
                {
                    page === "play" &&
                    <GameModes handlePageChange={this.handlePageChange}/>
                }
                {
                    page === "casual" &&
                    <Casual token={token} />
                }
                {
                    page === "timetrial" &&
                    <TimeTrial token={token} />
                }
                {
                    page === "profile" &&
                    <Profile token={token} />
                }
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)