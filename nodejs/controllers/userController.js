const bcrypt = require("bcrypt");
const userModel = require("../models/userSchema");
//const socket = require("../app");
//socket.ioObject.emit("auction", response)

module.exports = {
    registerUser: async (req, res) => {
        try {
            const { email, password1 } = req.body;

            const user = new userModel();
            const hash = await bcrypt.hash(password1, 10);

            user.email = email;
            user.password = hash;

            const response = await user.save();

            return res.send({
                error: false,
                message: "User registered successfully",
            });
        } catch (error) {
            console.log(error);
            return res.send({ error: true, message: error });
        }
    },

    login: async (req, res) => {
        try {
            const { email } = req.body;

            const response = await userModel.find({ email: email });

            req.session.email = response[0].email;

            return res.send({
                error: false,
                message: "Login successful",
                _id: response[0]._id,
                email: response[0].email,
            });
        } catch (error) {
            return res.send({ error: true, message: error });
        }
    },

    logout: async (req, res) => {
        if (req.session.email) {
            req.session.destroy();
            return res.send({ error: false, message: "Logged out" });
        }

        return res.send({ error: true, message: "Not logged in" });
    },
};
