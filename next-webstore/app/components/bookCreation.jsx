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


  const handleSubmit = (event) => {
    // TODO: handle form submission logic here
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
    </form>
  );
};

export default bookCreation;
