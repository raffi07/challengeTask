"use client";
import React, { useEffect, useState } from "react";
import UserProfile from "../components/userProfile";

const UserPage = () => {
  const [userData, setUserData] = useState(null);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(true);

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
        const response = await fetch(`${apiUrl}/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserMessage("success");
          setUserData(data);
        } else {
          setUserMessage("failed");
          console.error(error, "error");
          console.log(error, "log error");
          console.log("failed");
        }
      } catch (error) {
        setUserMessage("failed");
        console.error(error);
        console.log(error, "log error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="columns">
      <div>
        {loading ? <p>Loading...</p> : <UserProfile userData={userData} />}
      </div>
    </div>
  );
};

export default UserPage;
