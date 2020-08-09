require('dotenv').config()
const express = require('express');
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apikey = process.env.APIKEY;
  const unit = "metric";
  const apireq = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit + "";

  https.get(apireq, function(response) {

    console.log(response.statusCode);

    response.on("data", function(data) {

      const weatherData = JSON.parse(data)
      //console.log(weatherData);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(temp);
      console.log(weatherDescription);
      res.write("<h1>The temperature in " + req.body.cityName + " is " + temp + " deg C</h1>")
      res.write("<img src = " + imgurl + ">");
      res.send();
    })
  })


})
app.listen(3000, function() {
  console.log("Server is running on port 3000.")
});



//paste again in app.get method for root


//
// res.send("Server is up and running");

// Now, in addition to checking the status code,
// we can also tap into the response that we get back, and call a method called on,
// and search through it for some data.
