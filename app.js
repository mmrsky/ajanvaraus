// Ajanvaraus sovellus
// Web-palvelu ja tietokantarajapinnat
// Author: Mika Mörsky OHSU19
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;


// Controllers
const reservationController = require('./controllers/reservation_controller');
const authController = require('./controllers/auth_controller');
const { render } = require('pug');
const { db } = require('./models/user-model');

//process.env["NODE_CONFIG_DIR"] = __dirname + "config";
const config = require('config'); //we load the db location from the JSON files

// Initialise express application
let app = express();

// Add Pug template engine in use
app.set('view engine', 'pug');

// Set body parser in use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.use(session({
    secret: 'ökljölkj',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000000
    }
}));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});
  
//Serve Static files
app.use(express.static(__dirname + '/public'));

const isLoggedHandler = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
}; 


// Authorization 
app.use(authController.handleUser);

app.get('/login', authController.getLogin);
app.post('/login', authController.postLogin);
app.get('/logout', authController.postLogout);
app.get('/register', authController.getRegister);
app.post('/register', authController.postRegister);
 
// Reservations
// app.get('/reservations', isLoggedHandler, reservationController.getReservations);       // GET /reservations - palautetaan kaikki varaukset
// app.post('/add-reservation', isLoggedHandler, reservationController.postReservation);       // POST /reservation - uuden varauksen lisääminen
// app.post('/update-reservation', isLoggedHandler, reservationController.putReservation);     // PUT /reservation/:id - olemassa olevan varauksen päivittäminen
// app.post('/delete-reservation', isLoggedHandler, reservationController.deleteReservation);   // DELETE /reservation/:id - varauksen poistaminen (tietoa ei tarvitse oikeasti poistaa tietokannasta) Kaikissa edessä palvelun juuri: http://service_root_url/reservations/...

//app.get('/reservations?search_criteria', isLoggedHandler, reservationController.x);     // GET /reservations?search_criteria - haetaan varauksia jollakin hakukriteerillä (palvelun nimillä, ajankohdalla jne.)
//app.patch('/reservation', isLoggedHandler, reservationController.patchReservation); // PATCH /reservation/:id - olemassa olevan varauksen osittainen päivittäminen (esim. varauksen ajan muuttaminen)

app.use((req, res, next) => {
    res.status(404);
    res.send(`page not found`);
});

//const mongoose_url = 'mongodb+srv://mmadmin:7BLFo7s7tpLidLPJ@cluster0-2vmd2.mongodb.net/test?retryWrites=true&w=majority';
//const mongoose_url = 'mongodb://127.0.0.1:27017/ajanvaraus';

mongoose.connect(config.DBHost, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('Mongoose connected');
    console.log('Start Express server');

    app.listen(PORT);
});
