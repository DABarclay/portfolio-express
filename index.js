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

function keepAlive(){
    console.log("Ping database");
    var sql_keep = `SELECT 1 + 1 AS solution`; 
    con.query(sql_keep, function (err, result) {
        if (err) throw err;
  });
}

setInterval(keepAlive, 60000); 

console.log(PORT);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))