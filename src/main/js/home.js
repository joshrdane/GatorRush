'use strict';

const React = require('react');

import CreateAccount from "./components/createAccount";


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            rememberMe: false,
            trigger: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.toggleCreateAccountVisibility = this.toggleCreateAccountVisibility.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.handleLogin(e, this.state.username, this.state.password);
    }

    handleLogin(e, username, password) {
        this.props.handleLogin(e, username, password);
    }

    handlePageChange(e, page) {
        this.props.handlePageChange(e, page);
    }

    toggleCreateAccountVisibility() {
        this.setState({
            trigger: !this.state.trigger
        });
    }

    render() {
        const { username, password, rememberMe } = this.state;
        return (
            <div className="background">
                <div>
                    <div className="container">
                        <div className="title"><p>Gator Rush</p></div>
                    </div>
                    <form className="container" onSubmit={this.handleSubmit}>
                        <img className="alligator-homepage" src="/images/Gator_TransparentBG.png"/>
                        <div className="login-container">
                            <div className="username-input">
                                <input type="text" id="username-input" name="username" maxLength="15" value={username} onChange={this.handleChange}/>
                            </div>
                            <div className="password-input">
                                <input type="password" id="password-input" name="password" value={password} onChange={this.handleChange}/>
                            </div>
                            <div className="remember-me">
                                <input type="checkbox" id="remember-me" name="rememberMe" value={rememberMe} onChange={this.handleChange}/>
                            </div>
                            <div>
                                <button type="submit" id="login-button"></button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="container">
                    <button data-page={"create-account"} className="btn-sign-up" onClick={this.toggleCreateAccountVisibility}>
                        Create an Account
                    </button>
                </div>
                <div className="container">
                    <div className="game_description-container">
                        <div className="game_description-content">
                            <p>
                                Gator Rush is an engaging game geared towards helping kids practice and review their math skills. With two different game modes, kids can choose between a casual or challenging experience.
                            </p>
                        </div>
                    </div>
                </div>
                <p className="attribution">
                    <a href="https://www.freepik.com/free-vector/blank-landscape-nature-park-scene-with-swamp_9720494.htm#query=swamp&position=5&from_view=search&track=sph%22%3EImage">
                        Image by brgfx
                    </a> on Freepik
                </p>
                <p className="attribution-1">
                    <a href="https://www.freepik.com/free-vector/game-ui-menu-interface-scrolls-parchments_31368897.htm#page=2&query=web%20game&position=11&from_view=search&track=sph%22%3EImage">
                        Image by upklyak
                    </a> on Freepik
                </p>
                <CreateAccount trigger = {this.state.trigger} handleLogin={this.handleLogin} handleTrigger={this.toggleCreateAccountVisibility} handlePageChange={this.handlePageChange}/>
            </div>
        );
    }
}

export default Home;