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
    console.log(apiUrl);
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
  const [books, setBooks] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    async function getBooks() {
      const fetchedBooks = await fetchBooks();
      setBooks(fetchedBooks);
    }

    getBooks();
  }, []);



  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleAddToCart = async (book) => {
    try {
      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
      };
      const token = getCookie("token");

      console.log(token, "token");
      console.log(id, "id")

      const response = await fetch(
          `http:localhost:3000/api/v1/cart`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({cart}),
          }
      );
      const data = await response.json();
      console.log('Cart: ', data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {!selectedBook && (
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
