import React, { useState } from 'react';
import axios from 'axios';
import "./style/login.css";

function Registration() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== password2) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('http://colleonisamuele5ib.altervista.org/APIBIBLIOTHECA/registration.php', {
                username,
                password,
                password2
            });

            console.log(response.data);

            if (response.data.code === 200) {
                alert("Registration successful");
                window.location.href = '/';
            } else {
                alert("Registration failed: " + response.data.errorText);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alert("Error: " + error.response.data.errorText);
            } else {
                console.error('There was an error!', error);
                alert("An error occurred during registration");
            }
        }
    };

    return (
        <div className="container">
            <div className="title">
                <h1>BIBLIOTHECA</h1>
                <h4>UN MONDO DI LIBRI A UN CLICK DI DISTANZA</h4>
            </div>
            <form className="form-login" onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="insert your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="insert your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Ripeti password:
                        <input
                            type="password"
                            id="password2"
                            name="password2"
                            placeholder="repeat password"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit" className="btn-login">Signup</button>
                <br />
                <p>sei già iscritto? <a href="/" className="change-login-a">Accedi</a></p>
            </form>

        </div>
    );
}

export default Registration;
