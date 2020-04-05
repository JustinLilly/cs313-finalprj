const express = require('express')
const path = require('path')
const Pool = require('pg-pool')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000
require('dotenv').config();
const moment = require('moment');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});


var app = express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/events', (req, res) => res.render('pages/events'))
  .get('/api/event', async (req, res) => {
    var sql = "SELECT * FROM fp_event";
    try {
      let result = await pool.query(sql);
      // Log this to the console for debugging purposes.
      console.log("Back from DB with result:");
      console.log(result.rows);
      res.status(200).json(result.rows)
    } catch(err) {
    // If an error occurred...
        console.log("Error in query: ")
        console.log(err);
    }
    })
  .post('/api/event/add', async (req, res) => {
    console.log('event add called');
    console.log(req.body);
    try {
      var sql = "INSERT INTO fp_event(event_name, event_date) VALUES($1,$2) RETURNING *";
      const name = req.body.eventName;
      const date = req.body.eventDate;
      if (name == null) { res.send('error and stuff'); }
      let values = [name, date];
      let sqlresponse = await pool.query(sql, values);
      console.log('sqlresponse: ');
      console.log(sqlresponse);
      res.send(sqlresponse);
  } catch (err){
      res.send(err);
  }
  })
  .delete('/api/event/delete', async (req, res) => {
    console.log('event delete called');
    console.log(req.body);
    try {
      var sql = "DELETE FROM fp_event WHERE event_id = $1";
      const id = req.body.eventId;
      if (id == null) { res.send('error and stuff'); }
      let values = [id];
      let sqlresponse = await pool.query(sql, values);
      console.log('sqlresponse: ');
      console.log(sqlresponse);
      res.send(sqlresponse);
  } catch (err){
      res.send(err);
  }
  })
  .post('/api/event/edit', async (req, res) => {
    console.log('event edit called');
    console.log(req.body);
    try {
      var sql = "UPDATE fp_event SET event_name = $1, event_date = $2 WHERE event_id = $3";
      const name = req.body.editEventName;
      const date = req.body.editEventDate;
      const id = req.body.editEventId;
      if (id == null) { res.send('error and stuff'); }
      let values = [name, date, id];
      let sqlresponse = await pool.query(sql, values);
      console.log('sqlresponse: ');
      console.log(sqlresponse);
      res.send(sqlresponse);
  } catch (err){
      res.send(err);
  }
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
  
  // USER STUFF
  .post('/api/user/add', async (req, res) => {
    console.log('user add called');
    console.log(req.body);
    try {
      var sql = "INSERT INTO fp_user(first_name, last_name) VALUES($1,$2) RETURNING *";
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      if (firstName == null) { res.send('error and stuff'); }
      let values = [firstName, lastName];
      let sqlresponse = await pool.query(sql, values);
      console.log('sqlresponse: ');
      console.log(sqlresponse);
      res.send(sqlresponse);
  } catch (err){
      res.send(err);
  }
  })
  .delete('/api/user/delete', async (req, res) => {
    console.log('user delete called');
    console.log(req.body);
    try {
      var sql = "DELETE FROM fp_user WHERE user_id = $1";
      const id = req.body.userId;
      if (id == null) { res.send('error and stuff'); }
      let values = [id];
      let sqlresponse = await pool.query(sql, values);
      console.log('sqlresponse: ');
      console.log(sqlresponse);
      res.send(sqlresponse);
  } catch (err){
      res.send(err);
  }
  })
  .post('/api/user/edit', async (req, res) => {
    console.log('user edit called');
    console.log(req.body);
    try {
      var sql = "UPDATE fp_user SET first_name = $1, last_name = $2 WHERE user_id = $3";
      const firstName = req.body.editFirstName;
      const lastName = req.body.editLastName;
      const id = req.body.editUserId;
      if (id == null) { res.send('error and stuff'); }
      let values = [firstName, lastName, id];
      let sqlresponse = await pool.query(sql, values);
      console.log('sqlresponse: ');
      console.log(sqlresponse);
      res.send(sqlresponse);
  } catch (err){
      res.send(err);
  }
  })
  
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

