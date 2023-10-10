"use client";
import React, { useState, useEffect } from "react";
import CartInventory from "../components/cartInventory";
import CartCheckout from "../components/cartCheckout";
import styles from "../styles/cart.module.css";

const CartPage =  () => {

    /* const getCookie = (name) => {
         const value = `; ${document.cookie}`;
         const parts = value.split(`; ${name}=`);
         if (parts.length === 2) return parts.pop().split(";").shift();
     };
     const token = getCookie("token");

     console.log(token, "token");*/

    const [cartItems, setCartItems] = useState([])

    useEffect( () => {
        try{
            const items =  fetch(
                `/api/v1/cart`,
                {
                    method: "GET",
                });
            setCartItems(items);
        }catch (e){
            console.log(e);
        }
    }, []);
    //TODO: show real cart items


    /* = [
      {
        id: 1,
        author: "Author 1",
        publisher: "Publisher 1",
        genre: "Genre 1",
        price: 10.0,
        quantity: 2,
      },
      {
        id: 2,
        author: "Author 2",
        publisher: "Publisher 2",
        genre: "Genre 2",
        price: 15.0,
        quantity: 1,
      },
      {
        id: 3,
        author: "Author 3",
        publisher: "Publisher 3",
        genre: "Genre 3",
        price: 20.0,
        quantity: 3,
      },
    ];*/

    return (
        <div className={styles.columns}>
            <CartInventory items={cartItems}/>
            <CartCheckout
                firstName="John"
                lastName="Doe"
                address="123 Main St"
                city="Anytown"
                state="CA"
                zipCode="12345"
                cardNumber="1234 5678 9012 3456"
                cardExpiration="01/23"
                cardCVV="123"
            ></CartCheckout>
        </div>
    );
};

export default CartPage;
