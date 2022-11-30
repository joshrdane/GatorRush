'use strict';

const React = require('react');

class MainMenu extends React.Component {

    constructor(props) {
        super(props);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogin(e) {
        this.props.handleLogin(e, "Tamitha", "Password123");
    }

    handleLogout(e) {
        this.props.handleLogout(e);
    }

    handlePageChange(e, page) {
        this.props.handlePageChange(e, e.target.dataset.page);
    }

    render() {
        const auth = this.props.token != null;
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
                            {
                                !auth &&
                                <li className="nav-item">
                                    <a className="nav-link" href={"#"} data-page={"home"} onClick={this.handlePageChange}>Home</a>
                                </li>
                            }

                            <li className="nav-item">
                                <a className="nav-link" href={"#"} data-page={"play"} onClick={this.handlePageChange}>Play</a>
                            </li>
                            {
                                auth &&
                                <li className="nav-item">
                                    <a className="nav-link" href={"#"} data-page={"profile"} onClick={this.handlePageChange}>Profile</a>
                                </li>
                            }
                            {
                                auth && // TODO: logout functionality
                                <li className="nav-item">
                                    <a className="nav-link" href={"#"} data-page={"logout"} onClick={this.handleLogout}>Logout</a>
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