// Controller for handling reservations

const reservationModel = require('../models/reservation-model');



//const getServices = (req, res, next) =>


// Get reservation item - GET /reservation - palautetaan valittu varaus
// const getReservation = (req, res, next) => {
//     const user = req.user;
//     user.populate('reservations')
//         .execPopulate()
//         .then(() => {
//             console.log('user:', user);
//             let data = {
//                 user_name: user.name,
//                 reservations: user.reservations
//             };
//             res.render('reservation', {data: data});
//         });
// };


// // Get list of reservation items - GET /reservations - palautetaan kaikki varaukset
// const getReservations = (req, res, next) => {
//     const user = req.user;
//     user.populate('reservations')
//         .execPopulate()
//         .then(() => {
//             console.log('user:', user);
//             let data = {
//                 user_name: user.name,
//                 reservations: user.reservations
//             };
//             res.render('reservations', {data: data});
//         });
// };

// // PUT /reservation/:id - olemassa olevan varauksen päivittäminen
// const putReservation = (req, res, next) => {
//     const user = req.user;
//     //const reservationIdToUpdate = req.body.reservation_id;
//     // Update reservation
//     user.reservations
//     reservationModel.findOneAndUpdate(req.body.reservation_id)
// };

// // Delete reservation item - DELETE /reservation/:id - varauksen poistaminen (tietoa ei tarvitse oikeasti poistaa tietokannasta) Kaikissa edessä palvelun juuri: http://service_root_url/reservations/...
// const deleteReservation = (req, res, next) => {
//     const user = req.user;
//     console.log('poista');
//     const reservationIdToDelete = req.body.reservation_id;
//     //Remove reservation from user.reservations
//     const updatedreservations = user.reservations.filter((reservationId) => {
//         return reservationId != reservationIdToDelete;
//     });
//     user.reservations = updatedreservations;
  
//     //Remove reservation object from database
//     user.save().then(() => {
//         reservationModel.findByIdAndRemove(reservationIdToDelete).then(() => {
//             console.log('poistellaan');
//             res.redirect('/reservations');
//         });
//     });
// };

// // Add new reservation item - POST /reservation - uuden varauksen lisääminen
// const postReservation = (req, res, next) => {
//     const user = req.user;
//     let newReservation = reservationModel({
//         text: req.body.reservationItem
//     });
//     newReservation.save().then(() => {
//         user.reservations.push(newReservation);
//         user.save().then(() => {
//             return res.redirect('/reservations');
//         });
//     });
// };

// module.exports.getReservation = getReservation;
// module.exports.getReservations = getReservations;
// module.exports.postReservation = postReservation;
// module.exports.deleteReservation = deleteReservation;
// module.exports.putReservation = putReservation;