import MainMenu from './mainmenu';
import Home from './home';
import GameModes from './gamemodes';
import Casual from './casual';


'use strict';

import MainMenu from "./mainmenu";

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
                    <div>Home!</div>
                }
                {
                    page === "play" &&
                    <div>Game Mode Selection Page</div>
                }
                {
                    page === "casual" &&
                    <div>Casual</div>
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

    // instead of returning casual
        // try adding background component
        // would need to swap content for each page 
    // give background an id -> id == "background"
        // that would go to div next to class 
        // <div class="background" id="background"/> [might be exactly this]
        // <div class="background">
            // <div id="backgroundContent">
    // how do you change the content of web page dynamically with react


    // return (<Casual />)
    render() {
        return (
            <div>
                <MainMenu/>
                <div class="background">
                    <GameModes />
                </div>
            </div>  
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)