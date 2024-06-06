import React, { useEffect, useState } from 'react';
import "./style/utente.css";
import userIcon from "../assets/403019_avatar_male_man_person_user_icon.svg";
import Logo from "../assets/1.png";
import gearSetting from "../assets/gear-solid.svg";

function Utente() {
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = parseJwt(token);
                setUsername(decoded.username);
                setRole(decoded.ruolo);
            } catch (error) {
                console.error('Errore nella decodifica del token', error);
            }
        }
    }, []);

    return (
        <div className="container-user">
            <div className="col-left">
                <div className="row row1">
                    <div className="row-col left">
                        <img className="img-profile" src={userIcon} alt="User Icon" />
                    </div>
                    <div className="row-col right">
                        <h3 className="type-user">{role.toUpperCase()}</h3>
                    </div>
                </div>
                <div className="row row2">
                    <h5 className="user-name">WELCOME: {username.toUpperCase()}</h5>
                </div>
                <a href="/Setting" className="row row3">
                    <img src={gearSetting} className="setting-img" alt="Settings" />
                    <p className="setting-name">SETTING PROFILE</p>
                </a>
            </div>
            <div className="col-right">
                <div className="row top">
                    <a href="/Preferiti" className="preferitis">
                        <img src={Logo} className="logo-biblio" alt="Logo" />
                        <h6>I miei libri preferiti</h6>
                    </a>
                </div>
                <div className="row bottom">
                    <a href="/">LOGOUT</a>
                </div>
            </div>
        </div>
    );
}

export default Utente;

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
