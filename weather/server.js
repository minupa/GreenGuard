const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");

const app = express();
app.use(cors());

const PORT = 3000;

// Function to get weather data by running Python script
function getWeather(city) {
    return new Promise((resolve, reject) => {
        let pythonProcess;
        
        if (city) {
            pythonProcess = spawn("python", ["weather.py", city]); // Run with city parameter
        } else {
            pythonProcess = spawn("python", ["weather.py"]); // Auto-detect location
        }

        let dataString = "";
        pythonProcess.stdout.on("data", (data) => {
            dataString += data.toString();
        });

        pythonProcess.stderr.on("data", (data) => {
            console.error(`Python Error: ${data}`);
        });

        pythonProcess.on("close", (code) => {
            if (code === 0) {
                try {
                    const weatherData = JSON.parse(dataString);
                    resolve(weatherData);
                } catch (error) {
                    reject("Error parsing JSON from Python script.");
                }
            } else {
                reject("Python script exited with error.");
            }
        });
    });
}

// API route to fetch weather
app.get("/weather", async (req, res) => {
    console.log("Fetching automatic location...");

    try {
        const weatherData = await getWeather(""); // Get data for auto-detected city
        console.log("Full Weather Data:", weatherData);

        res.json(weatherData); // Send only the full weather data
    } catch (error) {
        console.error("Error fetching weather:", error);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

// API route to fetch weather for a specific city
app.get("/weather/:city", async (req, res) => {
    const city = req.params.city;
    console.log(`Fetching weather for: ${city}`);

    try {
        const weatherData = await getWeather(city);
        console.log("Full Weather Data:", weatherData);

        res.json(weatherData);
    } catch (error) {
        console.error("Error fetching weather:", error);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
