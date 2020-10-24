// Model for reservable Services

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    name: { type: String, required: true }
});

const serviceModel = new mongoose.model('service', serviceSchema);
module.exports = serviceModel;