import React from "react";
import { NavLink } from 'react-router-dom'
import './css/Landing.css'
export const Landing = () => {

  return (
    <div class="lbody">
    <div class="Section_top">
        <div class="content">
            <h1>Welcome to the IIT-B ASC WEBSITE </h1>
            <p>
            <NavLink to="/login" className="btn btn-primary">
              Login
            </NavLink>
            </p>
        </div>
    </div> 
    </div>
  )
};
