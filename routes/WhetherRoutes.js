const express = require('express');
const { getWeather } = require('../controllers/whetherControllers');
const router = express.Router();


router.route("/getWeather").post(getWeather);
router.route("/getWeather").get((req, res) => { res.send("<h1>hello</h1>") });


module.exports = router