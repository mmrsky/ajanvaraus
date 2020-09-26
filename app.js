// Ajanvaraus sovellus
// Web-palvelu ja tietokantarajapinnat
// Author: Mika Mörsky OHSU19

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;
// Initialise express application
let app = express();

// Add Pug template engine in use
app.set('view engine', 'pug');

// Set body parser in use
app.use(bodyParser.urlencoded({
    extended: true
}));


// https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
app.use((req, res, next) => {
    res.status(404);
    res.send(`page not found`);
});

//const mongoose_url = 'mongodb+srv://mmadmin:7BLFo7s7tpLidLPJ@cluster0-2vmd2.mongodb.net/test?retryWrites=true&w=majority';
const mongoose_url = 'mongodb://127.0.0.1:27017';
mongoose.connect(mongoose_url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('Mongoose connected');
    console.log('Start Express server');
    app.listen(PORT);
});