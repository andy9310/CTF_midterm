import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import {Card, CardFooter, Image, Button} from "@nextui-org/react";
import './Home.css';
import Cat from "../assets/cat.jpg";
function Home() {
  const navigate = useNavigate();
  const redirect_register = ()=>{
    navigate('/register');
  };
  const redirect_login = ()=>{
    navigate('/login');
  };
  return (
    <div>
        <div className='home-page-boarder'>
            <h1>welcome to r12921a25 website</h1>
            <img src={Cat}/>
            <div className='home-page-button-container'>
              <button onClick={redirect_register}>register</button>
              <button onClick={redirect_login}>login</button>
            </div>
            <h1>watch out for the guard cat</h1>
        </div>
    </div>
  );
}

export default Home;