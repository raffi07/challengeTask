import React, {useState} from "react";
import styles from '../styles/cart.module.css';

const cartCheckout = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [cardExpiration, setCardExpiration] = useState("")
    const [cardCVV, setCardCVV] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipCode, setZipCode] = useState("")


  const handleSubmit = (event) => {
    // TODO: handle form submission logic here
  };

  return (
    <form data-test="" className={styles.stickyForm} onSubmit={handleSubmit}>
      <h2>Shipping</h2>
      <div className={styles.checkoutDiv}>
        <label htmlFor="firstName">First Name: </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
      </div>
      <div className={styles.checkoutDiv}>
        <label htmlFor="lastName">Last Name: </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </div>

      <div className={styles.checkoutDiv}>
        <label htmlFor="address">Address: </label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
      </div>

      <div className={styles.checkoutDiv}>
        <label htmlFor="city">City: </label>
        <input
          type="text"
          id="city"
          name="city"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
      </div>

      <div className={styles.checkoutDiv}>
        <label htmlFor="state">State: </label>
        <input
          type="text"
          id="state"
          name="state"
          value={state}
          onChange={(event) => setState(event.target.value)}
        />
      </div>

      <div className={styles.checkoutDiv}>
        <label htmlFor="zipCode">Zip Code: </label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={zipCode}
          onChange={(event) => setZipCode(event.target.value)}
        />
      </div>

      <h2>Payment</h2>
      <div className={styles.checkoutDiv}>
        <label htmlFor="cardNumber">Card number: </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={cardNumber}
          onChange={(event) => setCardNumber(event.target.value)}
        />
      </div>

      <div className={styles.checkoutDiv}>
        <label htmlFor="cardExpiration">Card expiration: </label>
        <input
          type="text"
          id="cardExpiration"
          name="cardExpiration"
          value={cardExpiration}
          onChange={(event) => setCardExpiration(event.target.value)}
        />
      </div>

      <div className={styles.checkoutDiv}>
        <label htmlFor="cardCVV">CVV:</label>
        <input
          type="text"
          id="cardCVV"
          name="cardCVV"
          value={cardCVV}
          onChange={(event) => setCardCVV(event.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default cartCheckout;
