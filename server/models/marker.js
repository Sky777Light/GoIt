const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const markerSchema = new Schema({
    owner: { type: String, required: true }
});

module.exports = mongoose.model("Marker", markerSchema);
