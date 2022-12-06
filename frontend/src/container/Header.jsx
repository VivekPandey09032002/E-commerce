import React, { useState } from "react";
import Ham from "./Ham";
import { Link } from "react-router-dom";
import "../css/header.css";
function Header() {
  const [isDisplayHam, setIsDisplayHam] = useState(false)  
  const displayHam = () => {
    isDisplayHam ? setIsDisplayHam(false) : setIsDisplayHam(true)
    console.log('hello')
  }  
  return (
    <header>
      <div className="header-note">
        <p>Free Shipping For All Delhi Orders Over &#8377; 800</p>
      </div>
      <nav className="nav-bar">
        <div className="cursor" onClick={ () => { displayHam()}}> <i className="fa fa-bars" aria-hidden="true"></i></div>
        <p>E-Commerce Website</p>
        <div className="group-icon">
          <div className="cursor"><i className="fa fa-search" aria-hidden="true"></i></div>
          <div className="cursor"><i className="fa fa-user-circle" aria-hidden="true"></i></div>
          <div className="cursor"><i className="fa fa-shopping-cart" aria-hidden="true"></i></div>
        </div>
        { isDisplayHam && (<Ham setHam={setIsDisplayHam}/>)}
      </nav>
    </header>
  );
}

export default Header;
