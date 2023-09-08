const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "",
    database: 'getmetherapY'
})

// app.get('/',(req,res)=>{
//     return res.json("From backend");
// })

//select
app.get('/', (req, res) => {
    const sql = "SELECT * FROM `appointments` ORDER BY `date` ASC";
    db.query(sql, (err, appointment) => {
        if (err) return res.json(err);
        return res.json(appointment);
    })
})
//post
app.post('/appointments', (req, res) => {
    const id = req.body.id;
    const name = req.body.Name;
    const Age = req.body.Age;
    const date = req.body.date;
    const slot = req.body.slot;
    db.query("INSERT INTO `appointments` (`id`, `Name`, `Age`, `date`, `slot`) VALUES (?, ?, ?, ?, ?)", [id, name, Age, date, slot], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send({ Name: name })
        }
    })
})


app.listen(4000, () => {
    console.log("listening");
})