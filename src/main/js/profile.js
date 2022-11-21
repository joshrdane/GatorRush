'use strict';

const React = require('react');

class Profile extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"container"}>
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
            </div>
        );
    }
}

export default Profile;