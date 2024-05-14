import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { SampleContext } from '../contexts/SampleContext';
import cat from "../assets/cat2.jpeg"
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userid, setUserid } = useContext(SampleContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://ctfmidterm-21d491f65c05.herokuapp.com/register_server/api/login/', {
        email,
        password
      });
      console.log(response.data); // 處理登入成功
      if(response.data.status === "invalid"){
        alert("login failed, Wrong email or password");
      }
      else{
        setUserid(response.data.user_id.user_id);
        navigate('/chatroom');
      }
    } catch (error) {
      console.error(error); // 處理錯誤情況
    }
  };

  return (
    <div className='login-board'>
      <img className='cat-img' src={cat}></img>
      <form onSubmit={handleSubmit}>
          <input className='email-block' placeholder="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className='password-block' placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" className='login-button'>Login</button>
        <button type="submit" className='login-button' onClick={()=>{navigate('/');}}>home page</button>
      </form>
    </div>
  );
}

export default Login;