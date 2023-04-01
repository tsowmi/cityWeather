const express = require("express");
const app = express();

const https = require("https");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

// browser get request
app.post("/", function(req, res) {
  const query = req.body.cityName;
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units="+units+"&appid=c14835b956fa768f16cc1aa31bc521ef";
  // other server get request
  // Important Note: The url must contain https://
  https.get(url, function(response) {
    response.on("data", function(data) {
      const wd = JSON.parse(data);
      const temp = wd.main.temp;
      const icon = wd.weather[0].icon;
      //we get the image url from openweathermap as per the icon value (List of Condition codes)
      const imageUrl = "http://openweathermap.org/img/w/" + icon + ".png";
      res.write("<h1>The temperature in "+query+" is " + temp + " degree celcius</h1>");
      //Note how the imageUrl has been specified
      res.write("<img src=" + imageUrl + ">");
      res.send();
    })
  })
})

app.listen(3000, function() {
  console.log("Server is live at 3000");
})
