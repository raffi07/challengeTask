"use client";

import React, { useEffect } from "react";
import styles from "../styles/cart.module.css"
import CartItem from "../components/cartItem";

const cartInventory = ({items, totalPrice}) => {

  return (
    <div className={styles.leftColumn}>
      <h1 style={{ textAlign: "center" }}>Order</h1>
      {items.length > 0 &&
          items.map((item) => (
          <CartItem
              key={item.bookId}
              item={item.book}
              quantity={item.quantity}
              price={item.price}
          />
        ))}
        <h1 style={{ textAlign: "center" }}>{"Total price= $" + totalPrice}</h1>
    </div>
  );
};

export default cartInventory;
