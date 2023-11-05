import Link from "next/link";
import BookFilter from "./components/bookFilter";
import BookCards from "./components/bookCards";
import React from "react";

const HomePage = () => {
  return (
    <div className="columns">
{/*      <BookFilter />*/}
      <BookCards />
    </div>
  );
};

export default HomePage;
