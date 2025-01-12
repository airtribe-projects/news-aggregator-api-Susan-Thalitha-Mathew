const mongoose = require("mongoose");

const prefSchema = new mongoose.Schema({
    categories: {
        type: [String],
        required: true,
        minlength: 5,
        maxlength: 255
    },
    languages: {
            type: [String],
            required: true,
            minlength: 5,
            maxlength: 255
        },
        email: {
               type: String,
               minlength: 5,
               maxlength: 255
           }
});
const Preference = mongoose.model("Preference",prefSchema);
module.exports = Preference;