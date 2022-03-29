const bcrypt = require("bcrypt");
const userModel = require("../models/userSchema");
//const socket = require("../app");
//socket.ioObject.emit("auction", response)

module.exports = {
    registerUser: async (req, res) => {
        try {
            const { username, password1 } = req.body;

            const user = new userModel();
            const hash = await bcrypt.hash(password1, 10);

            user.username = username;
            user.password = hash;

            const response = await user.save();

            return res.send({
                error: false,
                data:
                    response && response.username === user.username
                        ? "User registered successfully"
                        : response,
            });
        } catch (error) {
            return res.send({ error: true, data: error });
        }
    },

    login: async (req, res) => {
        try {
            const { username } = req.body;

            const response = await userModel.find({ username: username });

            req.session.username = response[0].username;

            return res.send({
                error: false,
                data: "Login successful",
                _id: response[0]._id,
                username: response[0].username,
                money: response[0].money,
            });
        } catch (error) {
            return res.send({ error: true, data: error });
        }
    },

    logout: async (req, res) => {
        if (req.session.username) {
            req.session.destroy();
            return res.send({ error: false, data: "Logged out" });
        }

        return res.send({ error: true, data: "Not logged in" });
    },
};
