import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./style/setting.css";

function Setting() {
    const [username, setUsername] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = parseJwt(token);
                setUsername(decoded.username);
            } catch (error) {
                console.error('Errore nella decodifica del token', error);
            }
        }
    }, []);

    const handleUsernameChange = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const response = await axios.post('http://colleonisamuele5ib.altervista.org/APIBIBLIOTHECA/cambianome.php', {
                    token: token,
                    newUsername: newUsername
                });

                if (response.data.success) {
                    localStorage.setItem('token', response.data.newToken);
                    setUsername(newUsername);
                    alert('Username aggiornato con successo');
                } else {
                    alert('Errore durante l\'aggiornamento dell\'username');
                }
            } catch (error) {
                console.error('Errore durante l\'aggiornamento dell\'username', error);
                alert('Errore durante l\'aggiornamento dell\'username');
            }
        }
    };

    const handlePasswordChange = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const response = await axios.post('http://colleonisamuele5ib.altervista.org/APIBIBLIOTHECA/cambiapassword.php', {
                    token: token,
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    newPasswordConfirm: newPasswordConfirm
                });

                if (response.data.code === 200) {
                    alert('Password aggiornata con successo');
                    setOldPassword('');
                    setNewPassword('');
                    setNewPasswordConfirm('');
                } else {
                    alert(`Errore durante l'aggiornamento della password: ${response.data.message}`);
                }
            } catch (error) {
                console.error('Errore durante l\'aggiornamento della password', error);
                alert('Errore durante l\'aggiornamento della password');
            }
        }
    };

    return (
        <div className="cont-setting">
            <h3 className="title-set">GESTISCI IL TUO ACCOUNT</h3>
            <form className="form-a" onSubmit={handleUsernameChange}>
                <label className="lb-set">Il tuo username: {username}</label>
                <input 
                    type="text" 
                    name="username" 
                    id="u1" 
                    className="user-set" 
                    value={username}
                    readOnly
                />
                <label className="lb-set">Nuovo username:</label>
                <input 
                    type="text" 
                    name="username2" 
                    id="u2" 
                    className="user-set" 
                    placeholder="nuovo username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    required
                />
                <button className="btn-set" type="submit">Cambia username</button>
            </form>
            <br />
            <form className="form-b" onSubmit={handlePasswordChange}>
                <label className="lb-set">Cambia password</label>
                <input 
                    type="password" 
                    name="oldPassword" 
                    id="p1" 
                    className="user-set" 
                    placeholder="vecchia password..."
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                />
                <br />
                <input 
                    type="password" 
                    name="newPassword" 
                    id="p2" 
                    className="user-set" 
                    placeholder="nuova password..."
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <br />
                <input 
                    type="password" 
                    name="newPasswordConfirm" 
                    id="p3" 
                    className="user-set" 
                    placeholder="ripeti nuova password..."
                    value={newPasswordConfirm}
                    onChange={(e) => setNewPasswordConfirm(e.target.value)}
                    required
                />
                <button className="btn-set" type="submit">Cambia password</button>
            </form>
        </div>
    );
}

export default Setting;

// Funzione per parsare il token JWT
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Invalid token format", e);
        return null;
    }
}
