require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Get solution by disease name
app.get("/solution/:disease_name", (req, res) => {
  const diseaseName = req.params.disease_name;

  db.query(
    "SELECT solution FROM solutions WHERE disease_name = ?",
    [diseaseName],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database query failed" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Solution not found" });
      }
      res.json({ disease: diseaseName, solution: results[0].solution });
    }
  );
});

// Insert a new disease solution
app.post("/add-solution", (req, res) => {
  const { disease_name, solution } = req.body;

  db.query(
    "INSERT INTO solutions (disease_name, solution) VALUES (?, ?)",
    [disease_name, solution],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database insertion failed" });
      }
      res.json({ message: "Solution added successfully" });
    }
  );
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
