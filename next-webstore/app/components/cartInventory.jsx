"use client";

import React, { useEffect } from "react";
import styles from "../styles/cart.module.css"
import CartItem from "../components/cartItem";

const cartInventory = ({items}) => {

  return (
    <div className={styles.leftColumn}>
      <h1 style={{ textAlign: "center" }}>Order</h1>
      {items.length > 0 &&
          items.map((item) => (
          <CartItem key={item.id} item={item} author={item.author}>
            hello
          </CartItem>
        ))}
    </div>
  );
};

export default cartInventory;
