const express = require('express')
const dotenv = require('dotenv')
var cors = require('cors')
var mysql = require('mysql2');
var app = express()
require('dotenv').config()

app.use(cors())

const port = 8080;

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

app.post('/', (req, res) => {
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
 
app.listen(port, () => console.log(`Server running on port: ${port}`))