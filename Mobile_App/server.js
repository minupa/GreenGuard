const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected!');
});

app.get('/solution/:disease', (req, res) => {
    const disease = req.params.disease;
    const query = 'SELECT solution FROM solutions WHERE disease_name = ?';
    db.query(query, [disease], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json({ solution: result[0].solution });
        } else {
            res.status(404).json({ message: 'Solution not found' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});