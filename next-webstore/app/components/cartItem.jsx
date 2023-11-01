"use client";
import React from "react";
import styles from '../styles/cart.module.css';


const cartItem = ({ item, quantity, price }) => {
  console.log(`${item}`);
  return (
    <div  data-test={item._id}
      className={styles.cartItem}
      // item={item}
      // onQuantityChange={handleQuantityChange}
      // onRemoveItem={handleRemoveItem}
    >
      <>
        <h2 className={styles.cartItemTitle}> {item.title}</h2>
        <h3 className={styles.cartItemAuthor}> {item.author}</h3>
        <p className={styles.cartItemAuthor}>  Quantity: {quantity}</p>
        <p className={styles.cartItemAuthor}>${price} per unit</p>
        <p className={styles.cartItemPrice}>total =${price*quantity}</p>
      </>
    </div>
  );
};

export default cartItem;
