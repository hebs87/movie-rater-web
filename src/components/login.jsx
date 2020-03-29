import React, {Component} from "react";

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
            // We console log the token and then redirect the user
            // to the /movies route
            .then(res => {
                console.log(res.token);
                window.location.href = '/movies'
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

export default Login;
