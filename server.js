const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const Pool = require('pg').Pool

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parse JSON data

/*/ Create connection to MySQL
const db = mysql.createConnection({
     host: 'localhost',    // or your MySQL host
     user: 'root',         // your MySQL username
     password: 'Mysql@2438', // your MySQL password
     database: 'react' // your database name
});*/



const pool = new Pool({
  user: 'wings_user',
  host: 'cst3art2ng1s73ar0ojg-a.oregon-postgres.render.com',
  database: 'wings',
  password: 'lufXhuqeoimCfr2j2FBAw3gq6XSX9YWL',
  port: 5432,
  ssl: {
    rejectUnauthorized: true, // Set to true for secure environments
},
})

// Connect to MySQL
pool.connect((err) => {
     if (err) {
         console.error('Error connecting to MySQL:', err);
     } else {
         console.log('Connected to POSTGRESQL');
     }
 });

// API endpoint to insert data into MySQL
app.post('/api/users', (req, res) => {
     const { user_name,pass, email, age } = req.body;
     const sql = 'INSERT INTO food.users (user_name,pass, email, age) VALUES ($1,$2,$3,$4)';
     const d = pool.query(sql, [user_name,pass, email, age], (err, result) => {
        console.log({user_name,pass, email, age})
        console.log({result, err})
         if (err) {
             return res.json({message:err.message});
         }
         res.json({ message: 're mo kentse' });
     });
     console.log(d);
 });

 // API endpoint to retrieve users from MySQL
app.get('/api/users', (req, res) => {
     const sql = 'SELECT * FROM food.users';
     pool.query(sql, (err, results) => {
         if (err) {
             return res.status(500).send(err);
         }
         res.json(results.rows);
     });
 });

 // Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});