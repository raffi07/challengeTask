"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {checkTextInput} from "@/helpers/checkFormInput";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState(""); // added state variable
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl =
      process.env.NEXT_PUBLIC_NODE_ENV === "production"
        ? "https://next-danube-webshop-backend.vercel.app/api/v1"
        : "http://localhost:3000/api/v1";

    if (isLogin) {
      try {
        const response = await fetch(`${apiUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        if (!response.ok) {
          throw new Error("Invalid email or password");
        }
        const data = await response.json(); // extract data from response
        setMessage("Successful login"); // set message state variable
        console.log(data, "data");
        setSuccess(true);

        // Set cookie with the token and expiration time
        const expires = new Date(Date.now() + data.expiresIn * 1000); // expiresIn is the token expiration time in seconds
        document.cookie = `token=${data.token};expires=${expires.toUTCString()};path=/`;
        setTimeout(() => {
          setMessage("");
        }, 5000);
      } catch (error) {
        console.log(error);
        setMessage(error.message);
        setTimeout(() => {
          setMessage("");
        }, 5000);
      }
    } else {
      if (password === passwordConfirm) {
        try {
          const response = await fetch(`${apiUrl}/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              username: username,
              password: password,
            }),
          });
          if (!response.ok) {
            throw new Error("Unable to create account");
          }
          const data = await response.json(); // extract data from response
          console.log(data, "data");
          setMessage("Account creation successful"); // set message state variable
          setSuccess(true);
        } catch (error) {
          console.error(error);
          setMessage(error.message);
          setTimeout(() => {
            setMessage("");
          }, 5000);
        }
      }else {
        throw new Error("The passwords are not matching.")

      }
    }
  };

  if(!success) {
    return (
        <div className="centered">
          <h1>{isLogin ? "Login" : "Sign Up"}</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            {!isLogin && (
                <div>
                  <label>Username:</label>
                  <input type="text" value={username} onChange={(e) => {
                    const sanitizedText = checkTextInput(e.target.value);
                    setUsername(sanitizedText)
                  }}/>
                </div>
            )}
            <div>
              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            {/* Additional fields only when isLogin is false */}

            {!isLogin && (
                <div>
                  <label>Confirm Password:</label>
                  <input
                      type="password"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}/>
                </div>
            )}
            <div className="form">
              <button class="search-button" type="submit">
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </div>
          </form>
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(!isLogin);
                }}
            >
              {isLogin ? "Sign up here" : "Login here"}
            </a>
          </p>

          {message ? (
              <h2 data-test="login-state" style={{color: "blue"}}>
                {" "}
                {message}{" "}
              </h2>
          ) : (
              ""
          )}
        </div>
    );
  }else{
    setIsLogin(!isLogin)
    router.push("/")
    return(
        <div>
          <h2 style={{color: "blue"}}>
            You are logged in
          </h2>
        </div>
    )
  }
};

export default LoginForm;
