const express = require('express')
const path = require('path')
const Pool = require('pg-pool')

const PORT = process.env.PORT || 5000
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/events', (req, res) => res.render('pages/events'))
  .get('/api/event', (req, res) => {


    var sql = "SELECT * FROM fp_event";
  
    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
  
        // Log this to the console for debugging purposes.
        console.log("Back from DB with result:");
        console.log(result.rows);
        res.status(200).json(result.rows)
    }); 
  })
  .get('/users', (req, res) => res.render('pages/users'))
  .get('/api/user', (req, res) => {


    var sql = "SELECT * FROM fp_user";
  
    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
  
        // Log this to the console for debugging purposes.
        console.log("Back from DB with result:");
        console.log(result.rows);
        res.status(200).json(result.rows)
    }); 
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


