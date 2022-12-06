import React from "react";
import { Link } from "react-router-dom";
function Ham({ setHam }) {
  return (
    <div className="ham">
      <Link
        to="/"
        onClick={() => {
          setHam(false);
        }}
      >
        Home
      </Link>
      <Link
        to="/contact"
        onClick={() => {
          setHam(false);
        }}
      >
        Contact
      </Link>
      <Link
        to="/about"
        onClick={() => {
          setHam(false);
        }}
      >
        About
      </Link>
    </div>
  );
}

export default Ham;
