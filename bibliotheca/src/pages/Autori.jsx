import "./style/autori.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Autori() {
    const [autori, setAutori] = useState({});

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("http://colleonisamuele5ib.altervista.org/APIBIBLIOTHECA/autori.php");
                console.log("API Response:", response.data); 

                const booksByAuthor = response.data.reduce((acc, book) => {
                    if (!acc[book.idautore]) {
                        acc[book.idautore] = {
                            nomeAutore: book.nomeAutore,
                            cognomeAutore: book.cognomeAutore,
                            libri: []
                        };
                    }
                    acc[book.idautore].libri.push(book);
                    return acc;
                }, {});

                setAutori(booksByAuthor);
            } catch (error) {
                console.error("Errore nel recupero dei libri:", error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="container-autori">
            <h2 className="title-autori">Incontra gli autori che hanno plasmato la nostra visione del mondo</h2>
            <br />
            <div className="card-container">
                {Object.keys(autori).length > 0 ? (
                    Object.values(autori).map((autore, index) => (
                        <div key={index} className="card-autore">
                            <h4 className="nome-autore">{autore.nomeAutore + " " + autore.cognomeAutore}</h4>
                            <div className="libri-autore">
                                {autore.libri.map((book, bookIndex) => (
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

export default Autori;
