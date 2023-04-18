var con = require('./db');

function getDate(){
    let getDate = new Date();
    console.log(getDate);
    let nowDate = getDate.toISOString().substring(0, 10);
    return nowDate
}

module.exports = function(app){
    app.post('/', (req, res) => {
        res.set('Content-Type', 'text/plain')
        res.send(`You sent: something to Express`)
        console.log("Post Recieved")
        nowDate = getDate();
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
                        'INSERT INTO `analytics` (`date`, `visits`) VALUES ("'+nowDate+'", "'+1+'")',
                    );
                }
            }
        )
    })

    app.post('/gitmed', (req, res) => {
        res.set('Content-Type', 'text/plain')
        console.log("Medusa Protocol git rep has been viewed");
        nowDate = getDate();
        con.query(
            'SELECT * FROM analytics WHERE date = ? LIMIT 1;', [nowDate], function(error, results){ 
                 // There was an issue with the query 
                if(error){ 
                     callback(error); 
                     return; 
                 } 
                if(results.length){ 
                     console.log("A link has been clicked and the date exists");
                     con.query(
                        'UPDATE analytics SET gitmed = gitmed + 1 WHERE date = "'+nowDate+'"',
                    );
                    }else{ 
                    console.log("A link has been clicked and the Date doesnt exist");
                    con.query(
                        'INSERT INTO `analytics` (`date`, `gitmed`) VALUES ("'+nowDate+'", "'+1+'")',
                    );
                }
            })
    })

    app.post('/medmain', (req, res) => {
        res.set('Content-Type', 'text/plain')
        console.log("Medusa website has been viewed");
        nowDate = getDate();
        con.query(
            'SELECT * FROM analytics WHERE date = ? LIMIT 1;', [nowDate], function(error, results){ 
                 // There was an issue with the query 
                if(error){ 
                     callback(error); 
                     return; 
                 } 
                if(results.length){ 
                     console.log("A link has been clicked and the date exists");
                     con.query(
                        'UPDATE analytics SET medmain = medmain + 1 WHERE date = "'+nowDate+'"',
                    );
                    }else{ 
                    console.log("A link has been clicked and the Date doesnt exist");
                    con.query(
                        'INSERT INTO `analytics` (`date`, `medmain`) VALUES ("'+nowDate+'", "'+1+'")',
                    );
                }
            })
    })

    app.post('/gitspa', (req, res) => {
        res.set('Content-Type', 'text/plain')
        console.log("Landing page git repo has been viewed");
        nowDate = getDate();
        con.query(
            'SELECT * FROM analytics WHERE date = ? LIMIT 1;', [nowDate], function(error, results){ 
                 // There was an issue with the query 
                if(error){ 
                     callback(error); 
                     return; 
                 } 
                if(results.length){ 
                     console.log("A link has been clicked and the date exists");
                     con.query(
                        'UPDATE analytics SET gitspa = gitspa + 1 WHERE date = "'+nowDate+'"',
                    );
                    }else{ 
                    console.log("A link has been clicked and the Date doesnt exist");
                    con.query(
                        'INSERT INTO `analytics` (`date`, `gitspa`) VALUES ("'+nowDate+'", "'+1+'")',
                    );
                }
            })

    
    })

    app.post('/spamain', (req, res) => {
        res.set('Content-Type', 'text/plain')
        //res.send(`You sent: something to Express`)
        console.log("Landing page website has been viewed");
        nowDate = getDate();
        con.query(
            'SELECT * FROM analytics WHERE date = ? LIMIT 1;', [nowDate], function(error, results){ 
                 // There was an issue with the query 
                if(error){ 
                     callback(error); 
                     return; 
                 } 
                if(results.length){ 
                     console.log("A link has been clicked and the date exists");
                     con.query(
                        'UPDATE analytics SET spamain = spamain + 1 WHERE date = "'+nowDate+'"',
                    );
                    }else{ 
                    console.log("A link has been clicked and the Date doesnt exist");
                    con.query(
                        'INSERT INTO `analytics` (`date`, `spamain`) VALUES ("'+nowDate+'", "'+1+'")',
                    );
                }
            })
    })

    app.post('/portfoliovue', (req, res) => {
        res.set('Content-Type', 'text/plain')
        //res.send(`You sent: something to Express`)
        console.log("Portfolio front end github has been viewed");
        nowDate = getDate();
        con.query(
            'SELECT * FROM analytics WHERE date = ? LIMIT 1;', [nowDate], function(error, results){ 
                 // There was an issue with the query 
                if(error){ 
                     callback(error); 
                     return; 
                 } 
                if(results.length){ 
                     console.log("A link has been clicked and the date exists");
                     con.query(
                        'UPDATE analytics SET portfoliovue = portfoliovue + 1 WHERE date = "'+nowDate+'"',
                    );
                    }else{ 
                    console.log("A link has been clicked and the Date doesnt exist");
                    con.query(
                        'INSERT INTO `analytics` (`date`, `portfoliovue`) VALUES ("'+nowDate+'", "'+1+'")',
                    );
                }
            })
    })

    app.post('/portfolioexpress', (req, res) => {
        res.set('Content-Type', 'text/plain')
        //res.send(`You sent: something to Express`)
        console.log("Portfolio back end github has been viewed");
        nowDate = getDate();
        con.query(
            'SELECT * FROM analytics WHERE date = ? LIMIT 1;', [nowDate], function(error, results){ 
                 // There was an issue with the query 
                if(error){ 
                     callback(error); 
                     return; 
                 } 
                if(results.length){ 
                     console.log("A link has been clicked and the date exists");
                     con.query(
                        'UPDATE analytics SET portfolioexpress = portfolioexpress + 1 WHERE date = "'+nowDate+'"',
                    );
                    }else{ 
                    console.log("A link has been clicked and the Date doesnt exist");
                    con.query(
                        'INSERT INTO `analytics` (`date`, `portfolioexpress`) VALUES ("'+nowDate+'", "'+1+'")',
                    );
                }
            })
    })
}