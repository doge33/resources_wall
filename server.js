// load .env data into process.env
//require('dotenv').config();
if (process.env.ENV !== 'production') require('dotenv').config()

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');
const cookieSession = require("cookie-session")
const connectFlash = require("connect-flash");
const session = require("express-session");
const path = require('path');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();
const database = require("./helpers/database")(db)

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//  The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

app.use(express.static(path.join(__dirname, '/public'), {
  index: false
}));


// Cookie Session
app.use(cookieSession({
  name: "session",
  keys: ["key1", "key2"]
}))

// Express Session
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true,
}))

// Connect Flash
app.use(connectFlash())

// Global variable
app.use((req, res, next) => {
  res.locals.message = req.session.message
  delete req.session.message
  next()
})

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const resourcesRoutes = require("./routes/resources");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/", usersRoutes(database));
app.use("/", resourcesRoutes(database));
// Note: mount other resources here, using the same pattern above

app.listen(PORT, () => {
  console.log(`Resource Wall listening on port ${PORT}`);
});
