'use strict';

const React = require('react');

class MainMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            auth: true
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Gator Rush</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="play">Play</a>
                            </li>
                            {
                                this.state.auth &&
                                <li className="nav-item">
                                    <a className="nav-link" href="profile">Profile</a>
                                </li>
                            }
                            {
                                this.state.auth && // TODO: logout functionality
                                <li className="nav-item">
                                    <a className="nav-link" href="logout">Logout</a>
                                </li>
                            }
                            {
                                !this.state.auth &&
                                <li className="nav-item">
                                    <a className="nav-link" href="login">Login</a>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default MainMenu;