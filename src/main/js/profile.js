'use strict';

const React = require('react');

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token: props.token,
            username: null,
            score: null,
            level: null,
            old_password: "",
            new_password: "",
            reenter_new_password: "",
            attempts: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch(`http://localhost:8080/account`, {
            method: 'get',
            headers: {
                token: this.state.token
            }
        }).then(response => {
            switch (response.status) {
                case 200:
                    response.json().then(response => {
                        this.setState({
                            username: response.username,
                            score: response.score,
                            level: response.level
                        });
                    });
                    break;
                default:
                    alert(response.status);
                    break;
            }
        });
        fetch(`http://localhost:8080/attempts`, {
            method: 'get',
            headers: {
                token: this.state.token
            }
        }).then(response => {
            switch (response.status) {
                case 200:
                    response.json().then(response => {
                        this.setState({
                            attempts: response
                        });
                    });
                    break;
                default:
                    alert(response.status);
                    break;
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { token, old_password, new_password, reenter_new_password } = this.state;
        if (new_password === reenter_new_password) {
            fetch('http://localhost:8080/account/password', {
                method: 'PATCH',
                headers: {
                    token: token,
                    old_password: old_password,
                    new_password: new_password
                }
            }).then(response => {
                switch (response.status) {
                    case 200:
                        alert("Password successfully changed.");
                        this.setState({
                            old_password: "",
                            new_password: "",
                            reenter_new_password: ""
                        });
                        break;
                    case 304:
                        alert("Old password is incorrect.");
                        break;
                    default:
                        alert(response.status);
                        break;
                }
            });
        } else {
            alert("Passwords do not match");
        }
    }

    handleChange(e) {
        const target = e.target;
        const { id, value } = target;
        this.setState({
            [id]: value
        });
    }

    render() {
        const { username, score, attempts, level } = this.state;
        return (
            <div className="background">
                <div className="container">
                    <div className="title-profile"><p>My Profile</p></div>
                </div>
                <div className="container">
                    <div className="change-password-container">
                        <div className="container-column">
                            <div className="change-password-content-title">
                                <p>Change Password</p>
                            </div>
                            <div className="change-password-content">
                                <p>Current Password</p>
                                <div className="password-container"/>
                                <div className="currentPassword-input">
                                    <input type="text" id="currentPassword-input" name="currentPassword-input"/>
                                </div>

                                <p>New Password</p>
                                <div className="password-container"/>
                                <div className="newPassword-input">
                                    <input type="text" id="newPassword-input" name="newPassword-input"/>
                                </div>

                                <p>Reenter New Password</p>
                                <div className="password-container"/>
                                <div className="reenteredPassword-input">
                                    <input type="text" id="reenteredPassword-input" name="reenteredPassword-input"/>
                                </div>

                            </div>
                            <button className="btn-ok"></button>
                        </div>
                    </div>
                    <div className="container-column">
                        <div className="greeting-container"></div>
                        <div/>
                        <div/>
                        <div/>
                        <div className="stats-container"></div>
                    </div>
                    <div className="review-questions-container"></div>
                </div>
            </div>    
        );
    }
}

export default Profile;