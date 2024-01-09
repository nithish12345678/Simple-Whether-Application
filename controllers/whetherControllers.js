const express = require('express');
const axios = require('axios');

const getWeather = async (req, res) => {
    try {
        const { cities } = req.body;

        if (!cities || !Array.isArray(cities)) {
            return res.status(400).json({ error: 'Invalid input. Please provide an array of city names.' });
        }

        const weatherPromises = cities.map(async (city) => {
            const weatherData = await fetchWeatherData(city);
            return { [city]: weatherData };
        });

        const weatherResults = await Promise.all(weatherPromises);
        const result = { weather: Object.assign({}, ...weatherResults) };

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function fetchWeatherData(city) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.Whether_API_KEY}`);
        const temperatureInCelsius = response.data.main.temp;
        return `${temperatureInCelsius}C`;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching weather data');
    }
}

module.exports = {
    getWeather,
};
