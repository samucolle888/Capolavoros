import "./style/biblio.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("http://colleonisamuele5ib.altervista.org/APIBIBLIOTHECA/biblio.php");
                console.log("API Response:", response.data); 
                setBooks(response.data);
            } catch (error) {
                console.error("Errore nel recupero dei libri:", error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="home-container">
            <h2 className="title-home">DOVE OGNI PAROLA RACCONTA UNA STORIA</h2>
            <h4 className="minititle-home">Benvenuti nella nostra biblioteca, il luogo dove l'immaginazione prende il volo.</h4>
            <br />
            <div className="container-book">
                {books.length > 0 ? (
                    books.map((book, index) => (
                        <a key={index} href="/Libro" className="book-card">
                            <img
                                src={`http://colleonisamuele5ib.altervista.org/APIBIBLIOTHECA/COPERTINE/${book.copertina}`}
                                alt={`${book.nome}`}
                                className="img-book"
                            />
                            <h5 className="book-name">{book.nome}</h5>
                        </a>
                    ))
                ) : (
                    <p>Nessun libro disponibile</p>
                )}
            </div>
        </div>
    );
}

export default Home;