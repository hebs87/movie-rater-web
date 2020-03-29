import React, {Component} from "react";
import {withCookies} from 'react-cookie';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            credentials: {
                username: '',
                password: ''
            },
            // This will be toggled - if it's true, we'll see the login page;
            // if false, we'll see the register page
            isLoginView: true
        }
    }

    // A function to get the form's input field values
    inputChanged = event => {
        const credentials = this.state.credentials;
        credentials[event.target.name] = event.target.value;
        this.setState({credentials});
    };

    // A function to log the user in or register them. If the isLoginView state
    // value is true, we will log the user in. If it's false, we'll register the
    // user and then toggle the state to true
    login = event => {
        if (this.state.isLoginView) {
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
                    if (res.token) {
                        this.props.cookies.set('token', res.token);
                        window.location.href = '/movies';
                    } else {
                        window.location.href = '/';
                        alert("Those details didn't match, please try again!")
                    }
                })
                .catch(error => console.log(error))
        } else {
            fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.state.credentials)
            }).then(res => res.json())
                // Upon registration, we invert the toggle state and display the
                // login page so that the user can login
                .then(res => {
                    alert(`Thanks, your details have been registered. Please login!`);
                    this.setState({isLoginView: !this.state.isLoginView});
                })
                .catch(error => console.log(error))
        }
    };

    // A function that inverts the isLoginView state when clicked
    toggleView = () => {
        this.setState({isLoginView: !this.state.isLoginView});
    };

    render() {
        // Destructure the state
        const {credentials} = this.state;

        return (
            <div className="login-container">
                <h1>
                    {
                        // If isLoginView is true, we display Login, else Register
                        this.state.isLoginView ? 'Login': 'Register'
                    }
                </h1>
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
                <button onClick={this.login}>
                    {
                        // If isLoginView is true, we display Login, else Register
                        this.state.isLoginView ? 'Login' : 'Register'
                    }
                </button>
                <p onClick={this.toggleView}>
                    {
                        this.state.isLoginView ? (
                            "Don't have an account? Create one!"
                        ) : (
                            "Already have an account? Go to the Login page!"
                        )
                    }
                </p>
            </div>
        )
    }
}

export default withCookies(Login);
