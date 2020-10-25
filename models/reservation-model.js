// Model for reservation item

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date, default: Date.now },
    service: { type: String, req: true },
    customer: { type: String, req: true }
//    customer_id: { type: Schema.Types.ObjectId, ref: 'customer', required: true },
//    service_id: { type: mongoose.Schema.Types.ObjectId, ref: 'service', req: true }
});

const reservationModel = new mongoose.model('reservation', reservationSchema);
module.exports = reservationModel;