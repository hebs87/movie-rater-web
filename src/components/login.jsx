import React, {Component} from "react";
import {withCookies} from 'react-cookie';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            credentials: {
                username: '',
                password: ''
            }
        }
    }

    // A function to get the form's input field values
    inputChanged = event => {
        const credentials = this.state.credentials;
        credentials[event.target.name] = event.target.value;
        this.setState({credentials});
    };

    // A function to log the user in
    login = event => {
        fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.credentials)
        }).then(res => res.json())
            // If the user successfully logs in, we use the cookies prop
            // from the withCookies HOC and set it to the res.token - the
            // first argument is the token name (can be whatever we want),
            // and the second is the token from the res object. Then we
            // redirect the user to the /movies route
            // If the details don't match, we display an alert and redirect
            // the user back to the login page
            .then(res => {
                if(res.token) {
                    this.props.cookies.set('token', res.token);
                    window.location.href = '/movies';
                } else {
                    window.location.href = '/';
                    alert("Those details didn't match, please try again!")
                }
            })
            .catch(error => console.log(error))
    };

    render() {
        // Destructure the state
        const {credentials} = this.state;

        return (
            <div className="login-container">
                <h1>Login</h1>
                <span>Username</span>
                <br/>
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={this.inputChanged}
                />
                <br/>
                <span>Password</span>
                <br/>
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={this.inputChanged}
                />
                <br/>
                <button onClick={this.login}>Login</button>
            </div>
        )
    }
}

export default withCookies(Login);
