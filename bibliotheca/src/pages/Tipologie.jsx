import "./style/tipologie.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Tipologie() {
    const [tipologie, setTipologie] = useState({});

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("http://colleonisamuele5ib.altervista.org/APIBIBLIOTHECA/tipologie.php");
                console.log("API Response:", response.data);

                const booksByType = response.data.reduce((acc, book) => {
                    if (!acc[book.idtipologia]) {
                        acc[book.idtipologia] = {
                            nomeTipologia: book.nomeTipologia,
                            libri: []
                        };
                    }
                    acc[book.idtipologia].libri.push(book);
                    return acc;
                }, {});

                setTipologie(booksByType);
            } catch (error) {
                console.error("Errore nel recupero dei libri:", error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="tipo-container">
            <h2 className="title-tipologie">Un viaggio attraverso i generi letterari ti aspetta</h2>
            <br />
            <div className="card-container">
                {Object.keys(tipologie).length > 0 ? (
                    Object.values(tipologie).map((tipologia, index) => (
                        <div key={index} className="card-tipo">
                            <h4 className="nome-tipo">{tipologia.nomeTipologia}</h4>
                            <div className="libri-tipo">
                                {tipologia.libri.map((book, bookIndex) => (
                                    <a key={bookIndex} href="/Libro" className="book-card">
                                        <img
                                            src={`http://colleonisamuele5ib.altervista.org/APIBIBLIOTHECA/COPERTINE/${book.copertina}`}
                                            alt={`${book.nomeLibro}`}
                                            className="img-book"
                                        />
                                        <h5 className="book-name">{book.nomeLibro}</h5>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nessun libro disponibile</p>
                )}
            </div>
        </div>
    );
}

export default Tipologie;
