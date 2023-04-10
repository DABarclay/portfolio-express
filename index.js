const express = require('express')
const dotenv = require('dotenv')
var cors = require('cors')
var mysql = require('mysql2');
var app = express()
require('dotenv').config()


var corsOptions = {
    origin: "http://192.168.0.103:8081/main/",
    optionsSuccessStatus: 200
};



const PORT = process.env.PORT || 8080;

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get('/', cors(corsOptions), (req, res) => {
    res.send('TEST success!')
})

app.post('/', cors(corsOptions), (req, res) => {
    res.set('Content-Type', 'text/plain')
    res.send(`You sent: something to Express`)
    console.log("Post Recieved")
    updateDatabase();
    //checkDatabase();  
})

function checkDatabase(){
    con.query('SELECT * FROM analytics', function(err, rows) 
    {
    if (err) throw err;

    console.log(rows[0]);
    });
};
 
function updateDatabase(){
    console.log("CHECK")
    let getDate = new Date()
    let nowDate = getDate.toISOString().substring(0, 10);
    console.log(nowDate);

    con.query(
       'SELECT * FROM analytics WHERE date = ? LIMIT 1;', [nowDate], function(error, results){ 
            // There was an issue with the query 
            if(error){ 
                callback(error); 
                return; 
            } 
            if(results.length){ 
                console.log("Date exists");
                con.query(
                    'UPDATE analytics SET visits = visits + 1 WHERE date = "'+nowDate+'"',
                )
            }else{ 
                console.log("Date doesnt exist");
                con.query(
                    'INSERT INTO `analytics` (`date`, `Visits`) VALUES ("'+nowDate+'", "'+1+'")',
                );
            }
        }
    )
}

function keepAlive(){
    var sql_keep = `SELECT 1 + 1 AS solution`; 
    con.query(sql_keep, function (err, result) {
        if (err) throw err;
        console.log("Ping DB");
  });
}

setInterval(keepAlive, 60000); 

console.log(PORT);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))