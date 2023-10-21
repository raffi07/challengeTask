"use client";
import React, {useEffect, useState} from "react";
import {handleNotFoundResponse} from "next/dist/server/future/route-modules/helpers/response-handlers";

const bookProfile = ({ author, title, publisher, id , price}) => {

    const [sessionCreated, setSessionCreated] = useState(false);

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2)
            return parts.pop().split(";").shift();
    };

    useEffect(() => {
        // Check if a session key already exists in cookies
        const existingSessionKey = getCookie("sessionKey");

        if (existingSessionKey) {
            // A session already exists, so set the state to true
            setSessionCreated(true);
        }
    }, []);

    async function createSession() {
        const apiUrl =
            process.env.NEXT_PUBLIC_NODE_ENV === "production"
                ? "https://next-danube-webshop-backend.vercel.app/api/v1"
                : "http://localhost:3000/api/v1";

        try {
          const response = await fetch(`${apiUrl}`, {
            method: "GET",
          });
          const data = await response.json();
          //Set sessionKey and expiration time
          const expires = new Date(Date.now() + data.expiresIn * 1000); // expiresIn is the token expiration time in seconds
          document.cookie = `sessionKey=${data.token};expires=${expires.toUTCString()};path=/`;

        } catch (error) {
          console.log(error);
          return null;
        }
    }


    const handleSubmit = async() =>  {
        //Create a session the first time on click "add to cart" to create sessionKey
        if(!sessionCreated){
            await createSession();
        }

        try {
            const getCookie = (name) => {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(";").shift();
            };
            const token = getCookie("sessionKey");

            const response = await fetch(
                `/api/v1/cart`,
                {
                    method: "POST",
                    body: JSON.stringify({ bookId: id , quantity: 1, price: 2, token: token}),
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
