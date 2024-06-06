import React, { useState } from 'react';
import axios from 'axios';
import "./style/login.css";

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://colleonisamuele5ib.altervista.org/APIBIBLIOTHECA/login.php', {
                username,
                password,
            });

            console.log(response.data);

            if (response.data.code === 200) {
                console.log("Accesso eseguito con successo");
                localStorage.setItem('token', response.data.token);
                onLogin();
            } else {
                alert("Errore durante il login: " + response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alert("Errore: " + error.response.data.message);
            } else {
                console.error('Si è verificato un errore!', error);
                alert("Si è verificato un errore durante il login");
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
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Inserisci il tuo username"
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Inserisci la tua password"
                        />
                    </label>
                </div>
                <button type="submit" className="btn-login">Login</button>
                <br />
                <p>Non sei ancora iscritto? <a href="/Registration" className="change-login-a">Registrati</a></p>
            </form>
        </div>
    ); 
}

export default Login;
