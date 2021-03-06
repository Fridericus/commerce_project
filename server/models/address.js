const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    user: { type: Schema.Types.ObjectID, ref: "User"},
    country: String,
    fullName: String,
    streetAddress: String,
    city: String,
    county: String,
    postCode: String,
    phoneNumber: String,
    deliverInstructions: String,
    securityCode: String
});

module.exports = mongoose.model("Address", AddressSchema);