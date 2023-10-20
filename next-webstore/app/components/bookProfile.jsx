"use client";
import React, { useState } from "react";
import {handleNotFoundResponse} from "next/dist/server/future/route-modules/helpers/response-handlers";

const bookProfile = ({ author, title, publisher, id , price}) => {

    const handleSubmit = async() =>  {
        //TODO: add "add to cart" button

        try {
            console.log(id, "bookId");

            const getCookie = (name) => {
                const value = `; ${document.cookie}`;
                console.log(token, "value");
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(";").shift();
            };
            const token = getCookie("token");

            console.log(token, "token");

            const response = await fetch(
                `/api/v1/cart`,

                {
                    method: "POST",
                    body: JSON.stringify({ bookId: id , quantity: 1, price: 2}),
                    headers: {
                        "Content-Type": "application/json",
                    },
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
