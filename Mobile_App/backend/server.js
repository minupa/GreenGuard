// filepath: backend/server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Import cors
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'plant_disease_solutions'
});

// Connect to the database
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Endpoint to get solution for a disease
app.get('/solution/:disease', (req, res) => {
  const disease = req.params.disease;
  const query = 'SELECT solution FROM solutions WHERE disease_name = ?';
  db.query(query, [disease], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send('Solution not found');
    }
    res.send(result[0].solution);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});