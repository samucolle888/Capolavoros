import React, { useState, useEffect } from "react";
import axios from "axios";

import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import Home from "./pages/Biblio.jsx";
import Autori from "./pages/Autori.jsx";
import Tipologie from "./pages/Tipologie.jsx";
import Utente from "./pages/Utente.jsx";
import Libro from "./pages/Libro.jsx";
import Registration from "./pages/Registration.jsx";
import Setting from "./pages/Setting.jsx"
import Preferiti from "./pages/Preferiti.jsx";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                const response = await axios.get(`http://colleonisamuele5ib.altervista.org/APIBIBLIOTHECA/sessione.php?token=${token}`);
                if (response.data.logged_in && !response.data.session_expired) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Error checking session", error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
        window.location.href = "/Home";
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Login onLogin={handleLogin} />;
    }

    let component;
    const path = window.location.pathname;

    switch (path) {
        case "/Home":
            component = <Home />;
            break;
        case "/Autori":
            component = <Autori />;
            break;
        case "/Tipologie":
            component = <Tipologie />;
            break;
        case "/User":
            component = <Utente />;
            break;
        case "/Registration":
            component = <Registration />;
            break;
        case "/Libro":
            component = <Libro />;
            break;
        case "/Setting":
            component = <Setting />;
            break;
        case "/Preferiti":
            component = <Preferiti />;
            break;
        default:
            component = <Login  onLogin={handleLogin} />;
    }

    const showNavbar = path !== "/" && path !== "/Registration";

    return (
        <>
            {showNavbar && <Navbar />}
            <div className="BIG-CONTAINER">
                {component}
            </div>
        </>
    );
}

export default App;
