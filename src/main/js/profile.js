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
            <div className={"container"}>
                <div className={"container-fluid row mb-3"}><h1>My Profile</h1></div>
                <div className={"row mb-3"}>
                    <div className={"col-lg-4"}>
                        <form onSubmit={this.handleSubmit}>
                            <div className={"row mb-3"}>Change Password</div>
                            <div className={"row mb-3"}>
                                <label htmlFor="old_password" className="form-label">Old Password</label>
                                <input type="password" className="form-control" id="old_password" onChange={this.handleChange} value={this.state.old_password} />
                            </div>
                            <div className={"row mb-3"}>
                                <label htmlFor="new_password" className="form-label">New Password</label>
                                <input type="password" className="form-control" id="new_password" onChange={this.handleChange} value={this.state.new_password} />
                            </div>
                            <div className={"row mb-3"}>
                                <label htmlFor="new_password" className="form-label">Reenter New Password</label>
                                <input type="password" className="form-control" id="reenter_new_password" onChange={this.handleChange} value={this.state.reenter_new_password} />
                            </div>
                            <div className={"row mb-3"}>
                                <button type={"submit"}>Ok</button>
                            </div>
                        </form>
                    </div>
                    <div className={"col-lg-4"}>
                        <div className={"row"}>Hey {username}!</div>
                        <div className={"row"}>
                            <div className={"row"}>
                                Current Level: {level}/30
                            </div>
                            <div className={"row"}>
                                Top Score: {score}
                            </div>
                        </div>
                    </div>
                    <div className={"col-lg-4"}>
                        <div className={"row mb-1"}>Review Missed Questions</div>
                        {
                            attempts.map((attempt, index) => {
                                return (
                                    // TODO: the div below is just a placeholder
                                    <div className={"row mb-1"} key={attempt.timestamp}>{attempt.answer === attempt.response ? "Correct" : "Incorrect"}: {attempt.problem} = {attempt.response} {attempt.mode} {attempt.timestamp}</div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;