"use client";
import React, { useState, useEffect } from "react";
import CartInventory from "../components/cartInventory";
import CartCheckout from "../components/cartCheckout";
import styles from "../styles/cart.module.css";

const CartPage =  () => {

    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect( () => {
        const fetchData = async () => {
            const apiUrl =
                process.env.NEXT_PUBLIC_NODE_ENV === "production"
                    ? "https://next-danube-webshop-backend.vercel.app/api/v1"
                    : "http://localhost:3000/api/v1";
            try{

                const response = await  fetch(
                `${apiUrl}/cart`,
                {
                    method: "GET",
                });
                const items = await response.json();
                setCartItems(items.data.books);
                setTotalPrice(items.data.price);
        }catch (e){
            console.log(e);
        }
        }
        fetchData();
    }, []);


    return (
        <div className={styles.columns}>
            <CartInventory items={cartItems} totalPrice={totalPrice}/>
            <CartCheckout/>
        </div>
    );
};

export default CartPage;
