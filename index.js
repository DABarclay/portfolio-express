const express = require('express')
const dotenv = require('dotenv')
var cors = require('cors')
var mysql = require('mysql2');
var app = express()
require('dotenv').config()

app.use(cors())

const PORT = process.env.PORT || 8080;

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

app.get('/', (req, res) => {
    res.send('TEST success!')
})

app.post('/', (req, res) => {
    res.set('Content-Type', 'text/plain')
    res.send(`You sent: something to Express`)
    console.log("Post Recieved")

    updateDatabase()
})
 
function updateDatabase(){
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });  

    let getDate = new Date()
    let nowDate = getDate.toISOString().substring(0, 10);
    console.log(nowDate);

    con.promise().query(
       'SELECT * FROM analytics WHERE date = ? LIMIT 1;', [nowDate], function(error, results){ 
            // There was an issue with the query 
            if(error){ 
                callback(error); 
                return; 
            } 
            if(results.length){ 
                con.query(
                    'UPDATE analytics SET visits = visits + 1 WHERE date = "'+nowDate+'"',
                )
                console.log("Date exists, update the visit counter");
            }else{ 
                con.query(
                    'INSERT INTO `analytics` (`date`, `Visits`) VALUES ("'+nowDate+'", "'+1+'")',
                );
                console.log("Date doesnt exist, insert new date");
            }
        }
    )
}

console.log(PORT);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))