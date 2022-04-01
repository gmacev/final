const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const date = new Date();

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
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
});

module.exports = mongoose.model("userModel", userSchema);
