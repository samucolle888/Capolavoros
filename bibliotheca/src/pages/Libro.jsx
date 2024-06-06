import "./style/libro.css"
import { useState, useEffect } from "react";
import axios from "axios";
import imgProva from "../assets/download.jpg";

function Libro () {
    return(
        <div className="libro-container">
            <div className="col-l">
                <div className="cl-l1">
                    <h3 className="title-libro">PRENDO CON API</h3>
                </div>
                <div className="cl-l2">
                    <img src={imgProva} className="img-copertina" />
                </div>
            </div>
            <div className="col-r">
                <div className="cr-r1">
                    <button className="btn-preferiti">Aggiungi ai tuoi libri preferiti</button>
                </div>
                <div className="cr-r1">
                    <h5 className="autore-libro">Autore: Salazar</h5>
                </div>
                <div className="cr-r1"> 
                <h5 className="tipologia-libro">Tipologia: musica</h5>
                </div>
                <div className="cr-r1">
                    <h5 className="isbn-libro">ISBN: 1234567890123</h5>
                </div>
            </div>
        </div>
    );
}

export default Libro;