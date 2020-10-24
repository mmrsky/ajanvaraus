// Model for reservation item

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date, default: Date.now },
    text: { type: String, required: true },
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'services',
        req: true        
    }]
});

const reservationModel = new mongoose.model('reservation', reservationSchema);
module.exports = reservationModel;