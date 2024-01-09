const express = require('express');
const dotenv = require('dotenv');
const app = express();
const axios = require('axios');
const cors = require('cors');
const WhetherRoutes = require("./routes/WhetherRoutes.js")


dotenv.config();

app.use(cors());

const postData = {
    cities: ["toronto", "mumbai", "london"]
};






app.use(express.json());

app.use("/", WhetherRoutes);

app.get("/", async (req, res) => {

    axios.post('http://localhost:5000/getWeather', postData)
        .then(response => {
            console.log('Response:', response.data);
            res.send(response.data);
        })
        .catch(error => {
            console.error('Error:', error.message);
            res.send("error occured");
        });


})



app.listen(5000, () => {

    console.log(`listening on ${process.env.Port}`)
})