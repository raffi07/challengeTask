"use client";
import React, {useState} from "react";
import styles from '../styles/cart.module.css';

// "title": "Lord of the Flies",
// "author": "William Golding",
// "publisher": "Faber and Faber",
// "price": 7.99

const bookCreation = () => {

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [publisher, setPublisher] = useState("")
    const [price, setPrice] = useState("")
    const [message, setMessage] = useState("")


const handleSubmit = async (event) => {
  event.preventDefault();

  const apiUrl =
                process.env.NEXT_PUBLIC_NODE_ENV === "production"
                    ? "https://next-danube-webshop-backend.vercel.app/api/v1"
                    : "http://localhost:3000/api/v1";

  try {
    const response = await fetch(`${apiUrl}/books/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        author: author,
        publisher: publisher,
        price: price
      }),
    });
    if (!response.ok) {
      console.log(`\nThis is the response status \n ${response.status}`)
      if (response.status === 409){
        setMessage("This book already exists")
      }
      throw new Error("Unable to create book");
    }
    const data = await response.json(); // extract data from response
    console.log(data, "data");
    setMessage("Book creation successful"); // set message state variable
  } catch (error) {
    console.error(error);
    setMessage(error.message);
    setTimeout(() => {
      setMessage("An error has occured");
    }, 5000);
  }

  // do something with form data, like send it to a server
  console.log("Book created:", { title, author, publisher, price });

  // clear form fields
  setTitle("");
  setAuthor("");
  setPublisher("");
  setPrice("");
};

  return (
    <form data-test="" className={styles.stickyForm} onSubmit={handleSubmit}>
      <h2>Book Creation</h2>
      <div className={styles.checkoutDiv}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div className={styles.checkoutDiv}>
        <label htmlFor="author">Author: </label>
        <input
          type="text"
          id="author"
          name="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
      </div>

      <div className={styles.checkoutDiv}>
        <label htmlFor="publisher">Publisher: </label>
        <input
          type="text"
          id="publisher"
          name="publisher"
          value={publisher}
          onChange={(event) => setPublisher(event.target.value)}
        />
      </div>

      <div className={styles.checkoutDiv}>
        <label htmlFor="price">Price: </label>
        <input
          type="text"
          id="price"
          name="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
      <div>
        {message}
      </div>
    </form>
  );
};

export default bookCreation;
