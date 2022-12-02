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
        if (document.cookie === "") {
            this.state = {
                token: null,
                page: "home"
            }
        } else {
            this.state = {
                token: document.cookie.substring(5,69),
                page: "play"
            }
        }

        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogin(e, username, password, rememberMe) {
        fetch('http://localhost:8080/auth', {
            method: 'post',
            headers: {
                'username': username,
                'password': password
            }
        }).then(response => {
            switch (response.status) {
                case 200:
                    response.text().then(response => {
                        if (rememberMe) {
                            let date = new Date();
                            date.setMonth( date.getMonth() + 1 );
                            document.cookie = "name=" + response + "expires=" + date.toUTCString() + ";"
                        }

                        this.setState({ token: response })});
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
        }).then(() =>
            this.setState({
                token: null
            })
        );
        let date = new Date();
        date.setMonth( date.getMonth() - 1 );
        document.cookie = "name=; " + "expires=" + date.toUTCString() + ";"
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
                <MainMenu token={token} handleLogout={this.handleLogout} handlePageChange={this.handlePageChange}/>
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
                    <TimeTrial handlePageChange={this.handlePageChange} token={token} />
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