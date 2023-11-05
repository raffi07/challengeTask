"use client";
import React, {useState} from "react";

const search = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [success, setSuccess] = useState(false);
    const [selectedBook, setSelectedBook] = useState('');

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

  return (
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
        {success?
           books.map(book => {
               return(
                   <div key={book.id} value={book.id}>
                       {book.title}
                   </div>
               )
           })
        : null}
    </div>
  );
};

export default search;
