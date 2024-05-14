import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import robot from "../assets/register_robot.jpeg"
function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://ctfmidterm-21d491f65c05.herokuapp.com/register_server/api/set_account/', {
        email:email,
        password:password,
        image:image,
      });

      console.log(response.data); // 處理註冊成功
      if(response.data === "success"){
        alert("register success");
        navigate('/login');
      }
      else{
        alert("register failed, Email have been used");
      }
    } catch (error) {
      alert("照片檔案過大");
      console.error(error); // 處理錯誤情況
    }
  };
  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      setImage(reader.result);
    };
    return reader.result;
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  return (
    <div className='register-board'>
      <img className='robot-img' src={robot}></img>
      <form onSubmit={handleSubmit}>
        <input className='email-block' placeholder="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className='password-block' placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <div>
          <h3>頭像上傳(請勿超過25mb)</h3>
          <input type="file" onChange={e =>  getBase64(e.target.files[0]) } />
        </div>
        <button className='register-button' type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;