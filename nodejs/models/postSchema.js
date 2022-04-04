const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    owner: {
        type: String,
        required: true,
    },
    threadId: {
        type: String,
        required: true,
    },
    threadTitle: {
        type: String,
        required: true,
    },
    post: {
        type: Array,
        required: true,
    },
    createdTimeStamp: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("postModel", postSchema);
