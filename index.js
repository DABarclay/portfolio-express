const express = require('express')
const dotenv = require('dotenv')
var app = express()
var cors = require('cors')
require('dotenv').config()
require('./routes')(app);
var con = require('./db');

app.use(cors());

const PORT = process.env.PORT || 8080;


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get('/', (req, res) => {
    res.send('TEST success!')
})

app.post('/', (req, res) => {
    res.set('Content-Type', 'text/plain')
    res.send(`You sent: something to Express`)
    console.log("Post Recieved")
    updateDatabase();
})

 
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