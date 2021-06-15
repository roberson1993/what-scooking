var express = require('express');
var app = express();
var port = 3000;
var connection = require("./connection.js");
var session = require("express-session");

// Express-session factory
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }));

app.get("/",(req, res)=>{

    res.send(` 
    Welcome 
    Send your user and password 
    http://localhost:3000/login

    http://localhost:3000/users
    `)

});

/* INTRO */ 












/* DONE PART   */ 

// Login SYSTEM ready
app.get("/login",(req, res)=>{

    var username = req.query.username;
    var password = req.query.password;
    console.log(password)
    connection.query(`select * from login_data where username = '${username}' and password =${password}`,(err, row) => {
        if (err) {
            console.log(err.message)
        }
        else {
            if(row == ""){
                res.send("wrong username or password");
            }
            else{
                req.session.userkey = row[0].username;
                 res.redirect("/dashboard");
            }
        }
    })
});

app.get("/dashboard",(req,res)=>{
connection.query(`select * from login_data where username = '${req.session.userkey}'`, (err, row)=>{
if(err){
    throw err
}
res.send(`
    Welcome ${row[0].name},
    Your session is save as : ${req.session.userkey}
    `)
    });
})


// Sign UP system ready

app.get("/signup", (req,res)=>{

var fullname = req.query.name;
var username = req.query.username;
var password = req.query.password;
connection.query(`SELECT * FROM login_data WHERE username = '${username}'`, (err, row)=>{
    if(err){
        throw err
    }
    if(row == ''){
connection.query(`insert into login_data(name, username, password) value('${fullname}','${username}','${password}')`, (err, row)=>{
    if(err){
        throw err
    }

    res.send("User save")

})
        
    }
    else{
        res.send("This username is unvalable")
    }
})
})



// SELECT ALL FOR TEST

app.get("/users", (req, res) => {
    connection.query("select * from login_data", (err, row) => {
        if (err) {
            console.log(err.message)
        }
        else {
            res.send(row);
        }
    })
})



// Logout to distroy your session
app.get("/logout", (req,res)=>{
    req.session.destroy();
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  })
