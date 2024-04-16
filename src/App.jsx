import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ChatRoom from './components/ChatRoom';
import SampleContextProvider from './contexts/SampleContext.jsx' 
import './App.css'

function App() {

  return (
    <SampleContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chatroom" element={<ChatRoom />} />
        </Routes>
      </Router>
    </SampleContextProvider>
  );
}

export default App;
