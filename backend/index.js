const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();


app.use(cors())
app.use(express.json());
app.use(bodyParser.json());

app.get('/',(re, res)=>{
    return res.json("from backend side");
})
app.post('/register_server/api/login/',(req, res)=>{
    console.log(req.body);
    db.query(`SELECT user_id FROM login WHERE email = '${req.body.email}' AND password = '${req.body.password}';`, function (err, result) {
        if(result.length === 0){
            console.log("invalid login");
            return res.json({ status:"invalid", user_id:"null"});
        }
        else{
            console.log("login successfully");
            return res.json({ status:"valid", user_id : result[0] });
        }
    });
})
app.post('/register_server/api/set_account/',(req, res)=>{
    console.log(req.body);
    db.query(`SELECT email FROM login WHERE email = '${req.body.email}';`, function (err, result) {
        console.log(result);
        if(result.length === 0){
            console.log("no duplicate");
            db.query(`INSERT INTO login ( email, password, avatar ) VALUES ( '${req.body.email}','${req.body.password}','${req.body.image}' );`, function (err, result) {
                if (err) throw err;
                console.log("login information inserted");
            });
            return res.json("success");
        }
        else{
            console.log("login information inserted failed");
            return res.json("failed");
        }
    });
    
})
app.post('/register_server/api/chathistory/',(req, res)=>{
    console.log(req.body);
    db.query(`INSERT INTO message ( msg, user_id ) VALUES ( '${req.body.message}','${req.body.userid}' );`, function (err, result) {
        if (err) throw err;
        console.log("insert message success");
        return res.json("success");
    });
})

app.get('/register_server/api/chathistory/',(req, res)=>{
    db.query(`SELECT * FROM message;`, function (err, result) {
        if(result.length === 0){
            return res.send(["no message now"]);
        }
        
        const promise_set_avatar = new Promise((resolve)=>{
            for (let i = 0; i < result.length; i++) {
                console.log("check avatar");
                
                const promise_set_avatar_second_stage = new Promise((resolve, reject) => {
                    
                    db.query(`SELECT avatar FROM login WHERE user_id = '${result[i].user_id}';`, function (err, r) {
                        if (err) throw err;
                        console.log(r);
                        console.log(result.length);
                        result[i].avatar = r[0];
                        resolve(result);
                    });
                    
                })
                promise_set_avatar_second_stage.then((result)=>{
                    console.log("finish avatar");
                });
                
                
            }
            setTimeout((() => {resolve(result)}), 500);
            
        });
        promise_set_avatar.then((result)=>{
            let json_result = JSON.stringify(result)
            console.log("message history result");
            console.log(json_result);
            return res.send( json_result );
        });
        
    });
})

app.post('/register_server/api/cleanhistory/',(req, res)=>{
    db.query(`DELETE FROM message WHERE message_id = '${req.body.message_id}';`, function (err, result) {
        console.log(result);
    });
    return res.json("success");
})



app.listen(process.env.PORT || 3001 , ()=>{
    console.log('ok, server is running on port');
})


const db = mysql.createConnection({
    host: "0.0.0.0",
    user: "root",
    password: "Andy9310",
    database: "LoginInformation",
    port: 3306,
});
// db.query("CREATE TABLE login(email varchar(255), password varchar(255), avatar LONGBLOB)", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
// });