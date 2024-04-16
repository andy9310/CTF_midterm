import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { SampleContext } from '../contexts/SampleContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userid, setUserid } = useContext(SampleContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/register_server/api/login/', {
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
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit" className='login-button'>Login</button>
        <button type="submit" className='login-button' onClick={()=>{navigate('/');}}>home page</button>
      </form>
    </div>
  );
}

export default Login;