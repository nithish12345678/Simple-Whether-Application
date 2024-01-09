const express = require('express');
const dotenv = require('dotenv');
const app = express();
const axios = require('axios');
const cors = require('cors');
const WhetherRoutes = require("./routes/WhetherRoutes.js")


dotenv.config();

app.use(cors());







app.use(express.json());

app.use("/", WhetherRoutes);





app.listen(5000, () => {

    console.log(`listening on ${process.env.Port}`)
})
