"use strict";

const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const avMiddleware = require("./lib/av-middleware");
const images = require("./lib/controllers/images");

// use morgan to log requests to the console
app.use(
  morgan(
    "[:date[clf]] :method :url :status :res[content-length] - :response-time ms"
  )
);

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));

// use custom middleware
avMiddleware.init(app);

app.get("/", (req, res) => {
  return res.status(404).json("Not Found");
});

const appRoutes = express.Router();

appRoutes.post("/upload", (req, res) => images.uploadImage(req, res));

app.use("/api", appRoutes);

// Export Express app
module.exports = app;
