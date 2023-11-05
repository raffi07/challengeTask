"use client";

import Link from "next/link";
import BookProfile from "./bookProfile";
import { useState, useEffect } from "react";

async function fetchBooks() {
  const apiUrl =
    process.env.NEXT_PUBLIC_NODE_ENV === "production"
      ? "https://next-danube-webshop-backend.vercel.app/api/v1"
      : "http://localhost:3000/api/v1";

  try {
    const response = await fetch(`${apiUrl}/books`);
    const responseJSON = await response.json();
    const books = await responseJSON.data;
    return books;
  } catch (error) {
    console.log(error);
    return null;
  }
}
const BookCards = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [success, setSuccess] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    async function getBooks() {
        const fetchedBooks = await fetchBooks();
        setBooks(fetchedBooks);
    }
    getBooks();
  }, []);


  async function submitSearch(){
    const apiUrl =
        process.env.NEXT_PUBLIC_NODE_ENV === "production"
            ? "https://next-danube-webshop-backend.vercel.app/api/v1"
            : "http://localhost:3000/api/v1";

    const encodedQuery = encodeURIComponent(query);

    try {
      const response = await fetch(
          `${apiUrl}/books/search?query=${encodedQuery}`,
          {
            method: "GET",
          }
      );
      const data = await response.json();
      setBooks(data);
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  return (
    <>
      {!selectedBook && (
          <div className="rows">
        <div>
            <input
                name=""
                data-test="search-textarea"
                value={query}
                id="search-textarea"
                cols="30"
                rows="1"
                onChange={(event) => setQuery(event.target.value)}
            />
            <button data-test="search-submit" onClick={submitSearch}>search</button>
        </div>
        <div className="right-column">
          {books ? (
            <>
              {books.map((book) => (
                <div
                  className="card"
                  data-test={book.title}
                  key={book.id}
                  onClick={() => handleBookClick(book)}
                >
                  <div
                    data-test="book-div"
                    style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}
                  >
                    <h3 style={{ display: "flex", justifyContent: "center" }}>{book.title}</h3>
                    <img
                      style={{ display: "flex", justifyContent: "center" }}
                      src="./gatsbycover.png"
                      width="200"
                      height="200"
                      alt="User profile picture"
                    />
                  </div>

                  <ul>
                    <li> Author: {book.author}</li>
                    <li> Publisher: {book.publisher}</li>
                    <li> Genre: {book.genre}</li>
                    <li> Price: {book.price}</li>
                  </ul>
                 {/* <button className="btn" data-test="add-to-cart" onClick={() => handleAddToCart(book)}>
                    add to cart
                  </button>*/}
                </div>
              ))}
            </>
          ) : (
            <h1>LOADING</h1>
          )}
        </div>
          </div>
      )}
      {selectedBook && (
        <BookProfile
          id={selectedBook.id}
          author={selectedBook.author}
          publisher={selectedBook.publisher}
          title={selectedBook.title}
          price={selectedBook.price}
        />
      )}
    </>
  );
};

export default BookCards;
