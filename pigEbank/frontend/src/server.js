const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const { default: Login } = require('./Login');

const app = express();
app.use(cors());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: Login //fix
})

app.post("/login", (req, res) =>{
    const sql = "SELECT * FROM login WHERE username = ? AND password = ?";
    const values = [
        req.body.username,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Login Failed");
        return res.json(data);
    })
})

app.listen(8081, () =>{
    console.log("Listening...")
})