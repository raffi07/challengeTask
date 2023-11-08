import React, {useState} from "react";
import styles from '../styles/cart.module.css';
import {checkNumberInput, checkTextInput} from "@/helpers/checkFormInput";

const cartCheckout = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [cardExpiration, setCardExpiration] = useState("")
    const [cardCVV, setCardCVV] = useState("")
    const [success, setSuccess] = useState(false)


  const handleSubmit = async () => {
      const apiUrl =
          process.env.NEXT_PUBLIC_NODE_ENV === "production"
              ? "https://next-danube-webshop-backend.vercel.app/api/v1"
              : "http://localhost:3000/api/v1";

      try {
          const response = await fetch(
              `${apiUrl}/cart`,
              {
                  method: "PUT",
                  body: JSON.stringify(
                      {shippingAddress: {
                          firstName: firstName,
                          lastName: lastName,
                          address: address,
                          city: city,
                          state: state,
                          zipCode: zipCode
                      }, paymentMethod: {
                          cardNumber: cardNumber,
                          cardExpiration: cardExpiration,
                          cvv: cardCVV
                          }}),
                  headers: {
                      "Content-Type": "application/json",
                  },
              }
          );
          const data = await response.json();
          if(data.success === true){
              setSuccess(true);
          }
      } catch (error) {
          console.log(error);
      }
  };
    if(!success) {
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
                        onChange={(event) => {
                            const sanitizedText = checkTextInput(event.target.value)
                            setFirstName(sanitizedText)
                        }}
                    />
                </div>
                <div className={styles.checkoutDiv}>
                    <label htmlFor="lastName">Last Name: </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={(event) => {
                            const sanitizedText = checkTextInput(event.target.value)
                            setLastName(sanitizedText)
                        }}
                    />
                </div>

                <div className={styles.checkoutDiv}>
                    <label htmlFor="address">Address: </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={address}
                        onChange={(event) => {
                            const sanitizedText = checkTextInput(event.target.value)
                            setAddress(sanitizedText)
                        }}
                    />
                </div>

                <div className={styles.checkoutDiv}>
                    <label htmlFor="city">City: </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={city}
                        onChange={(event) => {
                            const sanitizedText = checkTextInput(event.target.value);
                            setCity(sanitizedText)
                        }}
                    />
                </div>

                <div className={styles.checkoutDiv}>
                    <label htmlFor="state">State: </label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={state}
                        onChange={(event) => {
                            const sanitizedText = checkTextInput(event.target.value);
                            setState(sanitizedText);
                        }}
                    />
                </div>

                <div className={styles.checkoutDiv}>
                    <label htmlFor="zipCode">Zip Code: </label>
                    <input
                        type="number"
                        id="zipCode"
                        name="zipCode"
                        value={zipCode}
                        onChange={(event) => {
                            const sanitizedNumber = checkNumberInput(event.target.value, 4, 5);
                            setZipCode(sanitizedNumber);
                        }}
                    />
                </div>

                <h2>Payment</h2>
                <div className={styles.checkoutDiv}>
                    <label htmlFor="cardNumber">Card number: </label>
                    <input
                        type="number"
                        id="cardNumber"
                        name="cardNumber"
                        value={cardNumber}
                        onChange={(event) => {
                            const sanitizedNumber = checkNumberInput(event.target.value, 16, 19);
                            setCardNumber(sanitizedNumber);
                        }}
                    />
                </div>

                <div className={styles.checkoutDiv}>
                    <label htmlFor="cardExpiration">Card expiration: </label>
                    <input
                        type="date"
                        id="cardExpiration"
                        name="cardExpiration"
                        value={cardExpiration}
                        onChange={(event) => setCardExpiration(event.target.value)}
                    />
                </div>

                <div className={styles.checkoutDiv}>
                    <label htmlFor="cardCVV">CVV:</label>
                    <input
                        type="number"
                        id="cardCVV"
                        name="cardCVV"
                        value={cardCVV}
                        onChange={(event) => {
                            const sanitizedNumber = checkNumberInput(event.target.value, 3, 3);
                            setCardCVV(sanitizedNumber)
                        }}
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        );
    }else{
        return (
            <h2>Thank you for inserting the shipping details</h2>
        )
    }
};

export default cartCheckout;
