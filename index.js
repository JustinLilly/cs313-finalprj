const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
require('dotenv').config();


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))



  const connectionString = process.env.DATABASE_URL;

  var sql = "SELECT * FROM fp_user";
  const pool = new Pool({connectionString: connectionString});


  pool.query(sql, function(err, result) {
      // If an error occurred...
      if (err) {
          console.log("Error in query: ")
          console.log(err);
      }

      // Log this to the console for debugging purposes.
      console.log("Back from DB with result:");
      console.log(result.rows);


  }); 