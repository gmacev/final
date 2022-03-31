const bcrypt = require("bcrypt");
const userModel = require("../models/userSchema");

module.exports = {
    validateUserRegister: async (req, res, next) => {
        let { email, username, password1, password2 } = req.body;

        email = email.toLowerCase();
        username = username.toLowerCase();

        let response = await userModel.findOne({ email: email });

        if (response)
            return res.send({ error: true, message: "User already exists" });

        if (username.length > 32)
            return res.send({
                error: true,
                message: "Display name can't be longer than 32 characters",
            });

        response = await userModel.findOne({
            username: username,
        });

        if (response)
            return res.send({
                error: true,
                message: "This display name is already taken",
            });

        if (password1 !== password2)
            return res.send({ error: true, message: "Passwords do not match" });

        if (password1.length < 5 || password1.length > 50) {
            return res.send({
                error: true,
                message:
                    "Password length should be between 5 and 50 characters",
            });
        }

        next();
    },

    validateUserLogin: async (req, res, next) => {
        const { email, password } = req.body;

        const response = await userModel.findOne({
            email: email.toLowerCase(),
        });

        if (response) {
            const compare = await bcrypt.compare(password, response.password);

            if (!compare)
                return res.send({
                    error: true,
                    message: "Wrong password",
                });
        } else {
            return res.send({
                error: true,
                message: "User with this email was not found",
            });
        }

        next();
    },

    validateEmail: async (req, res, next) => {
        const { email } = req.body;

        const validEmail = new RegExp(/^[\w-\.\_]+@([\w-]+\.)+[\w-]{2,4}$/);

        if (!validEmail.test(email)) {
            return res.send({
                error: true,
                message: "Email format is not valid",
            });
        }

        next();
    },

    validateIsUserLoggedIn: async (req, res, next) => {
        const { email } = req.session;

        if (!email) {
            return res.send({
                error: true,
                message: "User is not logged in",
            });
        }

        const user = await userModel.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.send({
                error: false,
                message: "User doesn't exist",
            });
        }

        next();
    },
};
