"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const header = () => {

    const [isAdmin, setIsAdmin] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        const apiUrl =
          process.env.NEXT_PUBLIC_NODE_ENV === "production"
            ? "https://next-danube-webshop-backend.vercel.app/api/v1"
            : "http://localhost:3000/api/v1";
  
        try {
          // Get token from cookies
          const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
          };
          const token = getCookie("token");
  
          // Fetch user data with token in headers
          const response = await fetch(`${apiUrl}/auth/admin`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          setIsAdmin(response.ok);
          console.log(`isAdmin: ${isAdmin}`)

        } catch (error) {
          setIsAdmin(false);
          console.error(error)
        }
      };
      fetchData();
    });

  return (
    <header className="header">
      <div className="logo">
        <Link rel="stylesheet" href="/">
          next danube
        </Link>
      </div>
      <div className="links">
        <Link href="/login">login</Link>
        <Link href="/cart">cart</Link>
        <Link href="/user">account</Link>
        {isAdmin ? <Link href="/bookHandling">books admin</Link> : null}
      </div>
    </header>
  );
};

export default header;
