// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

/* Dependencies */
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 8000;

// Setup Server
const server = app.listen(port, listening);

function listening(){
    console.log('server up and running');
    console.log(`running on localhost: ${port}`);
};

//GET route
app.get('/data', getData)

function getData(req, res) {
    res.send(projectData);

}

//POST route
app.post('/add', addData);

function addData(req, res) {
    console.log(req.body);
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.user_response = req.body.user_response;
    res.end();
    console.log(projectData)

}