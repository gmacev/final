const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    showEmail: {
        type: Boolean,
        required: true,
        default: false,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    registeredTimeStamp: {
        type: Number,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
        default:
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
    },
    threadCount: {
        type: Number,
        default: 0,
    },
    postCount: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("userModel", userSchema);
