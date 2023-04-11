var con = require('./db');

function getDate(){
    let getDate = new Date();
    let nowDate = getDate.toISOString().substring(0, 10);
    return nowDate
}

function isDateSet(nowDate){
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
            )}else{ 
                console.log("Date doesnt exist");
                con.query(
                    'INSERT INTO `analytics` (`date`) VALUES ("'+nowDate+'")',
                );
            }
        })
}

module.exports = function(app){

    app.post('/gitmed', (req, res) => {
        res.set('Content-Type', 'text/plain')
        console.log("Medusa Protocol git rep has been viewed");
        nowDate = getDate();
        isDateSet(nowDate);
        con.query(
            'UPDATE analytics SET gitmed = gitmed + 1 WHERE date = "'+nowDate+'"',
        );

    })

    app.post('/medmain', (req, res) => {
        res.set('Content-Type', 'text/plain')
        console.log("Medusa website has been viewed");
        nowDate = getDate();
        isDateSet(nowDate);
        con.query(
            'UPDATE analytics SET medmain = medmain + 1 WHERE date = "'+nowDate+'"',
        );
    })

    app.post('/gitspa', (req, res) => {
        res.set('Content-Type', 'text/plain')
        console.log("Landing page git repo has been viewed");
        nowDate = getDate();
        isDateSet(nowDate);
        con.query(
            'UPDATE analytics SET gitspa = gitspa + 1 WHERE date = "'+nowDate+'"',
        );
    
    })
    app.post('/spamain', (req, res) => {
        res.set('Content-Type', 'text/plain')
        //res.send(`You sent: something to Express`)
        console.log("Landing page website has been viewed");
        nowDate = getDate();
        isDateSet(nowDate);
        con.query(
            'UPDATE analytics SET spamain = spamain + 1 WHERE date = "'+nowDate+'"',
        );
    })

}