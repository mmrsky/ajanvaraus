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
const { render } = require('pug');
//const authController = require('./controllers/auth_controller');
//const { db } = require('./models/user-model');

// Database location saved in config json files. Different database for testing
const config = require('config'); 

// Initialise express application
let app = express();

// Add Pug template engine in use
app.set('view engine', 'pug');

// Set body parser in use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

// app.use(session({
//     secret: 'ö4käljlkdj43i',
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 1000000
//     }
// }));

// Logging methods
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});
  
//Serve Static files
app.use(express.static(__dirname + '/public'));

// TODO autentikointi ja kirjautuminen käyttöön
// const isLoggedHandler = (req, res, next) => {
//     if (!req.session.user) {
//         return res.redirect('/login');
//     }
//     next();
// }; 

// Authorization routes
// app.use(authController.handleUser);

// app.get('/login', authController.getLogin);
// app.post('/login', authController.postLogin);
// app.get('/logout', authController.postLogout);
// app.get('/register', authController.getRegister);
// app.post('/register', authController.postRegister);
 
// Reservation routes
// app.get('/reservations', isLoggedHandler, reservationController.getReservations);           // GET /reservations - palautetaan kaikki varaukset
// app.get('/reservations?search_criteria', isLoggedHandler, reservationController.searchReservations);         // GET /reservations?search_criteria - haetaan varauksia jollakin hakukriteerillä (palvelun nimillä, ajankohdalla jne.)
// app.post('/reservation', isLoggedHandler, reservationController.postReservation);       // POST /reservation - uuden varauksen lisääminen
// app.put('/reservation/:id', isLoggedHandler, reservationController.putReservation);        // PUT /reservation/:id - olemassa olevan varauksen päivittäminen
// app.patch('/reservation/:id', isLoggedHandler, reservationController.patchReservation);     // PATCH /reservation/:id - olemassa olevan varauksen osittainen päivittäminen (esim. varauksen ajan muuttaminen)
// app.delete('/reservation/:id', isLoggedHandler, reservationController.deleteReservation);   //DELETE /reservation/:id - varauksen poistaminen (tietoa ei tarvitse oikeasti poistaa tietokannasta)

app.get('/reservations', reservationController.getReservations);           // GET /reservations - palautetaan kaikki varaukset
app.post('/reservation',  reservationController.postReservation);       // POST /reservation - uuden varauksen lisääminen
app.put('/reservation/:id', reservationController.putReservation);        // PUT /reservation/:id - olemassa olevan varauksen päivittäminen
app.patch('/reservation/:id', reservationController.patchReservation);     // PATCH /reservation/:id - olemassa olevan varauksen osittainen päivittäminen (esim. varauksen ajan muuttaminen)
app.delete('/reservation/:id', reservationController.deleteReservation);   //DELETE /reservation/:id - varauksen poistaminen (tietoa ei tarvitse oikeasti poistaa tietokannasta)


app.use((req, res, next) => {
    res.status(404);
    res.send(`page not found`);
});

// Connect to database
mongoose.connect(config.DBHost, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('Mongoose connected');
    console.log('Start Express server');

    app.listen(PORT);
});
