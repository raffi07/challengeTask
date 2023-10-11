"use client";
import React, { useState, useEffect } from "react";
import CartInventory from "../components/cartInventory";
import CartCheckout from "../components/cartCheckout";
import styles from "../styles/cart.module.css";

const CartPage =  () => {

    const [cartItems, setCartItems] = useState([])

    useEffect( () => {
        const fetchData = async () => {
            const apiUrl =
                process.env.NEXT_PUBLIC_NODE_ENV === "production"
                    ? "https://next-danube-webshop-backend.vercel.app/api/v1"
                    : "http://localhost:3000/api/v1";
            try{
                const getCookie = (name) => {
                    const value = `; ${document.cookie}`;
                    const parts = value.split(`; ${name}=`);
                    if (parts.length === 2) return parts.pop().split(";").shift();
                };
                const token = getCookie("token");
                console.log(token, "token");

                const response = await  fetch(
                `${apiUrl}/api/v1/cart`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const items = await response.json();
                    console.log(items);
                    setCartItems(items);
                }else{
                    console.log("Error: ", error)
                }
        }catch (e){
            console.log(e);
        }
        }
        fetchData();
    }, []);


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
