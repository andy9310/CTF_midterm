import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/register_server/api/set_account/', {
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
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
          avatar:
          <input type="file" onChange={e =>  getBase64(e.target.files[0]) } />
          {/* <img className='avatar-exhibit' src={image}></img> */}
        </label>
        <button className='register-button' type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;