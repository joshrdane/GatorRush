'use strict';

import MainMenu from './mainmenu';
import Home from './home';
import GameModes from './gamemodes';
import Casual from './casual';

const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            auth: false,
            page: "home"
        }
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogin(e) {
        this.setState({
            auth: true
        })
    }

    handleLogout(e) {
        this.setState({
            auth: false
        })
    }

    handlePageChange(e, page) {
        this.setState({
            page: page === null ? e.target.dataset.page : page
        })
    }

    render() {
        const auth = this.state.auth;
        const page = this.state.page;
        return (
            <div>
                <MainMenu auth={auth} handleLogout={this.handleLogout} handleLogin={this.handleLogin} handlePageChange={this.handlePageChange}/>
                {
                    page === "home" &&
                    <Home/>
                }
                {
                    page === "play" &&
                    <GameModes handlePageChange={this.handlePageChange}/>
                }
                {
                    page === "casual" &&
                    <Casual/>
                }
                {
                    page === "time trial" &&
                    <div>Time Trial</div>
                }
                {
                    page === "profile" &&
                    <div>Profile</div>
                }
                {
                    page === "login" &&
                    <div>Profile</div>
                }
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)