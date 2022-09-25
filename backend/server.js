const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

// Connecting with mongo db
mongoose
  .connect(
    "mongodb://localhost:27017/db"
  )
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.error("Error  :", err.message);
  });

// Setting up port with express js

const courseRoute = require("./routes/item.route");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// cors implementation

app.use(cors());

app.use("/api", courseRoute);

// Create port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Connected to port " + port);
});

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // Log error message in our server's console
  console.error(err.message);
  // If err has no specified error code, set error code to 'Internal Server Error (500)'
  if (!err.statusCode) err.statusCode = 500;
  // All HTTP requests must have a response, so let's send back an error with its status code and message
  res.status(err.statusCode).send(err.message);
});
