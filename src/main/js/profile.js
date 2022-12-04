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
                case 400:
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
                case 400:
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
        const { name, value } = target;
        this.setState({
            [name]: value
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
                    <form className="change-password-container" onSubmit={this.handleSubmit}>
                        <div className="container-column">
                            <div className="change-password-content-title">
                                <p>Change Password</p>
                            </div>
                            <div className="change-password-content">
                                <p>Current Password</p>
                                <div/>
                                <div className="currentPassword-input">
                                    <input type="password" className="password-container" id="currentPassword-input" name="old_password" onChange={this.handleChange}/>
                                </div>
                                <div/><div/>
                                <p>New Password</p>
                                <div/>
                                <div className="newPassword-input">
                                    <input type="password" className="password-container" id="newPassword-input" name="new_password" onChange={this.handleChange}/>
                                </div>
                                <div/><div/>
                                <p>Reenter New Password</p>
                                <div/>
                                <div className="reenteredPassword-input">
                                    <input type="password" className="password-container" id="reenteredPassword-input" name="reenter_new_password" onChange={this.handleChange}/>
                                </div>
                                <div/><div/>
                            </div>
                            <div/><div/><div/><div/>
                            <button className="btn-ok" type={"submit"}></button>
                        </div>
                    </form>
                    <div className="container-column">
                        <div className="greeting-container">
                            <div className="greeting-content">
                                <p>Hey</p>
                                <p>{username}!</p>
                            </div>
                        </div>
                        <div/><div/><div/>
                        <div className="stats-container">
                            <img className="star-icon" src="/images/Star_Icon.png"/>
                            <img className="lightning-icon" src="/images/Lightning_Icon.png"/>
                            <div className="stats-content-currentLevel">
                                <p>Current Level: {level}/30</p>
                            </div>
                            <div className="stats-content-topScore">
                                <p>Top Score: {score}</p>
                            </div>
                        </div>
                    </div>
                    <div className="review-questions-container">
                        <div className="container-column">
                            <div className="review-questions-content-title">
                                <div/><div/>
                                <p>Review Questions</p>
                            </div>
                            <div id="review-scroll">
                            {
                                attempts.map((attempt, index) => {
                                    return (
                                        <div className="review-questions-content" key={attempt.timestamp}>
                                            {attempt.problem} = {attempt.response === attempt.answer ? (
                                                <span style={{color: "green"}}>{attempt.response}</span>
                                        ) : (
                                            <span><span style={{color: "red"}}>{attempt.response}</span> (<span style={{color: "green"}}>{attempt.answer}</span>)</span>)
                                        }
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        );
    }
}

export default Profile;