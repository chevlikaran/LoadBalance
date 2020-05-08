const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const port = process.env.PORT || 3001;

//Middleware for bodyparser
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Set view engine
//app.use(expressLayouts);
app.set('view engine', 'ejs');

//Testing the server
app.get('/', (req, res) => {
	console.log('Starting the application');
    res.render('index');
});

app.get('/access-denied-page', (req, res) => {
    res.render('access-denied-page');
});


//All routes
const ser = require('./routes/api/server');
const home = require('./routes/api/home');


app.use('/api/server', ser);
app.use('/api/home', home);

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});
