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
            attempts: []
        }
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

    render() {
        const { username, score, attempts, level } = this.state;
        return (
            <div className={"container"}>
                <div>Username: {username}</div>
                <div>Score: {score}</div>
                <div>Level: {level}</div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" />
                </div>
                <div className="mb-3">
                    <label htmlFor="new_password" className="form-label">New Password</label>
                    <input type="password" className="form-control" id="new_password" />
                    <label htmlFor="old_password" className="form-label">Old Password</label>
                    <input type="password" className="form-control" id="old_password" />
                </div>
                {
                    attempts.map((attempt, index) => {
                        return (
                            // TODO: the div below is just a placeholder
                            <div key={attempt.timestamp}>{attempt.answer === attempt.response ? "Correct" : "Incorrect"}: {attempt.problem} = {attempt.response} {attempt.mode} {attempt.timestamp}</div>
                        )
                    })
                }
            </div>
        );
    }
}

export default Profile;