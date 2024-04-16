import { imagefrombuffer } from "imagefrombuffer"; //first import
import React, { useState , useContext, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SampleContext } from '../contexts/SampleContext';
import './ChatRoom.css';
import { Buffer } from "buffer";

function ChatRoom() {
  const [histories, setHistory] = useState([]);
  const [fetch, setFetch] = useState(1);
  const [message, setMessage] = useState('');
  const { userid } = useContext(SampleContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if(userid === 10000){
        navigate('/login');
    }
    axios.get('http://localhost:3001/register_server/api/chathistory/')
        .then(response => {
            console.log(response.data);
            console.log("get history process"); 
            if(response.data == "no message now"){
                response.data = [];
            }
            setHistory(response.data);
        })
        .catch(err => {
            console.log(err);
       });
  },[fetch])
  
  const handleDelete = async (e) =>{
    if(e.target.className == userid){
        let message_id = e.target.id;
        try {
            const response = await axios.post('http://localhost:3001/register_server/api/cleanhistory/', {
                message_id,
            });
            console.log(response.data);
            if(response.data === "success"){
                // alert("delete finished");
            }
        } catch (error) {
            console.error(error); // 處理錯誤情況
        }

        alert("delete success")
        setFetch(fetch+1);
    }
    else{
        // alert(userid);
        // alert(e.target.className);
        alert("you can't delete other's message")
    }
  }
//   const handleDelete = async (event) => {
//     try {
//         const response = await axios.get('http://localhost:3001/register_server/api/cleanhistory/', {
//             message,
//             userid,
//         });
//     }
//   }
  const handleSubmit = async (event) => {
    // alert(userid);
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/register_server/api/chathistory/', {
        message,
        userid,
      });
      console.log(response.data); // 
      if(response.data === "invalid"){
        //alert("send message failed");
      }
      else{
        //alert("send message success");
        setFetch(fetch+1);
      }
    } catch (error) {
      console.error(error); // 處理錯誤情況
    }
  };
  function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  

  return (
    <div className="chatroom">
        
        <div className="chat-title">
            <h1>Message Board</h1>
        </div>
    
        <div className="messages" >
            { histories.length>0? histories.map((history,index)=>(
                <div key={index} id={ "card_" + index + history.user_id} className="cardBody">
                    <figure className="avatar-chat">
                        <img src={history.avatar.avatar} />
                    </figure>
                    <h4>{history.msg}</h4>
                    <button className={history.user_id} id={history.message_id} onClick={handleDelete}>delete</button>
                </div>
            )) : <div>no message</div>}
        </div>
    
        <div className="message-box">
            <textarea type="text" className="message-input" placeholder="留言輸入限制300字元內" onChange={e => setMessage(e.target.value)}></textarea>
            <button type="submit" className="message-submit" id="sendButton" onClick={handleSubmit}>Send</button>
        </div>
      
    </div>
  );
}

export default ChatRoom;