"use client";
import React, { useState } from "react";
import {handleNotFoundResponse} from "next/dist/server/future/route-modules/helpers/response-handlers";

const bookProfile = ({ author, title, publisher, id , price}) => {
  /*const [selectedFile, setSelectedFile] = useState(null);

  function handleFileUpload(event) {
    setSelectedFile(event.target.files[0]);
  }*/

    const handleSubmit = async() =>  {
    //TODO: add "add to cart" button
    /*event.preventDefault(); // prevent the default form submission
    const title = event.target.elements.title.value;
    const rating = event.target.elements.rating.value;
    const recommend = event.target.elements.recommend.value;
    const description = event.target.elements.description.value;*/
    try {
      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
      };
      const token = getCookie("token");

      console.log(token, "token");
      console.log(id, "id");
     // const userId ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMzVjZWU1LTQ5OTgtNDNmMC1hMmQzLTZjYTlhZTNhMTVkYiIsImlhdCI6MTY5Njc2NzE4OCwiZXhwIjoxNjk5MzU5MTg4fQ.DYztFZufkbdD2V9jmT3lKDh4XKD2Z2J7NOvEccJC84E"

      const response = await fetch(
          //TODO: userid?
        `/api/v1/cart`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookId: id }),
        }
      );
      const data = await response.json();
      console.log('Cart: ',data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="columns">
      <div className="left-column">
        <img
          data-test="book-image"
          className="book-image"
          width="300"
          height="300"
          src="./gatsbycover.png"
          alt="User profile picture"
        />
      </div>

      <div className="right-column-expanded">
        <form className="card-expanded" key={id}>
          <h1>Book</h1>
          <div className="form-group">
            <h3>Title: {title}</h3>
            <h3>Author: {author}</h3>
            <h3>Publisher: {publisher}</h3>
            <h3>Price: {price}</h3>
          </div>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>
            Add to cart
          </button>
        </form>
      </div>
    </div>
  );
};

export default bookProfile;
