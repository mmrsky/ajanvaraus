/////////////////////////////////////////////////////////
// Controller for handling reservations
/////////////////////////////////////////////////////////

const { response } = require('express');
const reservationModel = require('../models/reservation-model');

/////////////////////////////////////////////////////////
// Get list of reservation items 
/////////////////////////////////////////////////////////
const getReservations = (req, res, next) => {
    
    let query = req.query;
    reservationModel.find(query, (err, reservations) => {
        res.send(reservations);
        // TODO - käyttöliittymä
        //res.render(reservations);
    });
};

/////////////////////////////////////////////////////////
// Update reservation
/////////////////////////////////////////////////////////
const putReservation = (req, res, next) => {
    reservationModel.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((err, reservation) => {
        res.send(reservation);
    }).catch((err) => {
        console.log(err);
        res.status(404);
        return res.status(404).send('Reservation was not found.');
    });
};  

/////////////////////////////////////////////////////////
// Add new reservation item 
/////////////////////////////////////////////////////////
const postReservation = (req, res, next) => {

    // TODO tarkistus että haluttu aika on vapaa - oma funktio sille, mitä voi käyttää, myös PUT/PATCH tapauksissa
    const newReservation = reservationModel({
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        service: req.body.service,
        customer: req.body.customer
    }); 

    newReservation.save().then(() => {
        res.status(200);
        res.send(newReservation)
        return res.redirect('/reservations');
    });
};

/////////////////////////////////////////////////////////
// Patch reservation
/////////////////////////////////////////////////////////
const patchReservation = (req, res, next) => {
    
    // Tämä pitäisi toteuttaa niin että aikaa muuttaessa ensin haetaan find:lla ja sen jälkeen tarkistetaan 
    // mahdolliset ajan päällekkäisyydet ja palautetaan virhe jos kyseiselle palvelulle ei ole vapaata aikaa
    // ko. ajankohtana
    reservationModel.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((err, reservation) => {
        res.send(reservation);
    }).catch((err) => {
        console.log(err);
        res.status(404);
        return res.status(404).send('Reservation was not found.');
    });
};

/////////////////////////////////////////////////////////
// Delete reservation item 
/////////////////////////////////////////////////////////
const deleteReservation = (req, res, next) => {
    const reservationIdToDelete = req.params.id;
    reservationModel.findOneAndDelete({_id : reservationIdToDelete}).then(() => {
        console.log(reservationIdToDelete);
        res.status(204).send()
    }).catch((err) => {
     	res.status(404)
	    res.send({ error: "Reservation doesn't exist!" })
    });
};

module.exports.getReservations = getReservations;
module.exports.postReservation = postReservation;
module.exports.putReservation = putReservation;
module.exports.patchReservation = patchReservation;
module.exports.deleteReservation = deleteReservation;