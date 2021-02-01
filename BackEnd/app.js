const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jsonData = bodyParser.json();
const cors = require('cors');
app.use(cors());
const multer = require('multer');

const storage = multer.diskStorage({
    destination:'../frontEnd/src/assets/upload',filename:(req,file,callBack)=>{
        callBack(null,`image${file.originalname}`)
    }
})
const upload = multer({storage:storage})

// connection to server
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs'
});


// check Connection
con.connect(function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("connection done");
    }
})



//Fetch record Api 
app.get('/Fetchdata', function (req, res) {

    con.query('select * from Details', function (err, responce) {

        if (err) {
            console.log(err);
        } else {
            res.json(responce);
        }
    })
})



// Insert Data Api
app.post('/insetData', upload.single('file') , jsonData, function (req, res) {

    const file = req.file;
    con.query(`insert into details(Name,Email,Mob,ImageUrl) values("${req.body.Name}", "${req.body.Email}","${req.body.Mob}", "${file.filename}")`, function (err, responce) {

        if (err) {
            console.log(err);
        } else {
            res.json(responce);
        }
    })
})


// Update Data Api
app.put('/edit/:id', upload.single('file'),  jsonData, function (req, res) {
    const file=req.file;

    con.query(`update details set Name= "${req.body.Name}" , Email = "${req.body.Email}" ,Mob = "${req.body.Mob}" ,ImageUrl = "${file.filename}" where Id=${req.params.id}`, function (err, responce) {

        if (err) {
            console.log(err);
        } else {
            res.json(responce);
        }
    })
})

// Delete Data Api
app.delete('/deleteData/:id', function (req, res) {

    con.query(` delete from details where Id=${req.params.id} `, function (err, responce) {

        if (err) {
            console.log(err);
        } else {
            res.json(responce);
        }
    })

})


// Search Data Api
app.get("/search/:name", function (req, res) {

    con.query(` select * from technology where concat(Id,Name,Email.ImageUrl) like "%${req.params.name}%" `, function (err, responce) {
        if (err) {
            console.log(err);
        } else {
            res.json(responce);
        }
    })

})



app.listen(3000);



