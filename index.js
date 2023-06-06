const express = require("express");
const app = express();
const mysql = require('mysql2');
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "bditens",
})

//create
app.post("/item", (req, res) => {
    const {item} = req.body;
    let SQL = "INSERT INTO listaitens (itens) VALUES (?)";
    db.query(SQL, item,  (err, result) => {
        console.log(err);  
    })
});

app.listen(3001, () => {
    console.log('rodando servidor')
});