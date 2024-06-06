import React, { useState, useEffect } from "react";
import axios from "axios";

import "./style/navbar.css";
import searchIcon from "../assets/211817_search_strong_icon.svg";
import userIconA from "../assets/403019_avatar_male_man_person_user_icon.svg";
import userIconB from "../assets/403022_business man_male_user_avatar_profile_icon.svg";

function Navbar() {

    return (
        <div className="navbar">
            <a href="/Home" className="brand">BIBLIOTHECA</a>
            <a href="/Autori" className="autori">autori</a>
            <a href="/Tipologie" className="tipologie">tipologie</a>

            <form action="#" method="GET" className="search-form">
                <input type="text" name="search" id="search" placeholder="Cerca..." />
                <button type="submit" className="btn-search"><img src={searchIcon} alt="Search Icon" /></button>
            </form>

            <div className="user-container">
                <a href="/User" className="user">my Account</a>
                <img className="user-icon" src={userIconA} alt="User Icon" />
            </div>
        </div>
    );
}

export default Navbar;
