const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationsSchema = new Schema({
    owner: {
        type: String,
        required: true,
    },
    postBy: {
        type: String,
        required: true,
    },
    threadId: {
        type: String,
        required: true,
    },
    seen: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("notificationsModel", notificationsSchema);
