const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const threadSchema = new Schema({
    owner: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    createdTimeStamp: {
        type: Date,
        required: true,
    },
    postCount: {
        type: Number,
        default: 1,
    },
});

module.exports = mongoose.model("threadModel", threadSchema);
