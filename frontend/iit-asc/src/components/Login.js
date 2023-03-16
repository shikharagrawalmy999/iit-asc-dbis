import React, { useEffect } from "react"
import {  useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";

import './css/Login.css';
import background from "./img/pfl1.jpeg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Login  = ({ setAuth }) => {

    const navigate = useNavigate();
    const showToastMessage = (dat) => {

    toast.error(dat, {
        position: toast.POSITION.TOP_RIGHT
      });
    };

    const [data, setData] = useState({
        userid: '',
        password: ''
    });

    const [ch_inc,setchinc] = useState(false);
    const location = useLocation();
    const redirectPathS =  location.state?.path  ||  '/home';
    const redirectPathI =  location.state?.path  ||  '/inst_home';
    
    const myStyle={
      backgroundImage: `url(${background})`,
      height:'100vh',
      backgroundSize: 'cover',
      resizeMode: 'repeat', 
    };

    const changeHandler = (e) => {
        setData({...data, [e.target.name]: e.target.value})  
    }

    const Auth_U = ()=>{

      if(data.userid.length ===0 || data.password.length===0){
        showToastMessage('Username or Password Field is Empty');
      }else{
        fetch('http://localhost:5001/login', {
            method: 'POST',   
            headers: {
              'Content-type': 'application/json',
            },
            credentials:'include',
            withCredentials:true,
            body: JSON.stringify(data),
          })
        .then((response) => response.json())
        .then((dat) => {
            if(dat.value){
              if(dat.inst){
                setchinc(false);
              navigate(redirectPathI, { replace: true });
              }else{
                setchinc(false);
              navigate(redirectPathS, { replace: true });
              }
              
            }
            else{
              setchinc(true);
              showToastMessage('Invalid Username or Password'); 
            }
        })
        .catch((err) => {
          console.log(err.message);
        });
      }

    }

    useEffect(()=>{

      fetch('http://localhost:5001/exist', {
            method: 'POST',   
            headers: {
              'Content-type': 'application/json',
            },
            credentials:'include',
            withCredentials:true,
          })
        .then((response) => response.json())
        .then((dat) => {
          if(dat.value){
            if(dat.inst){
              setchinc(false);
            navigate(redirectPathI, { replace: true });
            }else{
              setchinc(false);
            navigate(redirectPathS, { replace: true });
            } 
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
      
    })
    

  return (
    <div style={myStyle} className="Auth-form-container">
      <ToastContainer />
      <div className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <div>{ch_inc && <label>Try Again</label>}</div>
            <label>User_ID</label>
            <input
              required
              type="text"
              className="form-control mt-1"
              value={data.username}
              placeholder="Enter userid"
              onChange={changeHandler}
              name = "userid"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              required
              type="password"
              className="form-control mt-1"
              value={data.password}
              placeholder="Enter password"
              onChange={changeHandler}
              name = "password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button onClick={Auth_U} className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
        </div>
    </div>
  )
};
