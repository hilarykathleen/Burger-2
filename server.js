// require packages
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
 
// app variable to run express
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 3000;

app.use(express.static("public"));

 // connect body parser element
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//template engine with a default of main
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// set up routes
var routes = require("./controllers/burgers_controller.js");
app.use(routes);

// port listen
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});