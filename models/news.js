const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }
});
const News = mongoose.model("News",newsSchema);
module.exports = News;