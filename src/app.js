const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Root path for express
const publicDirPath = path.join(__dirname, "../public");
// Path for handlebar views
const viewsPath = path.join(__dirname, "../templates/views");
// Path for partials handlebar ie header and footer
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handle bar engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup the path for the public directory. Will load up static index.html
app.use(express.static(publicDirPath));

// renders the index.hbs file
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Julie Tippett",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Julie Tippett",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Enter a location to display the weather forecast.",
    title: "Help",
    name: "Julie Tippett",
  });
});

// Two Parts:
// Calls geocode to obtain the latitude and longitude for the requested address
// If valid, lat and long are passed to forcast which performs a call to obtain weather info
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "An address is required" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          location,
          address: req.query.address,
          forecast: forecastData,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help",
    name: "JT",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "JT",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
