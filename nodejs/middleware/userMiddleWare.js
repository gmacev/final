const bcrypt = require("bcrypt");
const userModel = require("../models/userSchema");

module.exports = {
    validateUserRegister: async (req, res, next) => {
        const { email, password1, password2 } = req.body;

        const response = await userModel.find({ email: email });

        if (response[0])
            return res.send({ error: false, data: "User already exists" });

        if (password1 !== password2)
            return res.send({ error: true, data: "Passwords do not match" });

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
                message: "User with this email not found",
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
                success: false,
                message: "Vartotojas neprisijungęs",
            });
        }

        const user = await userSchema.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.send({
                success: false,
                message: "Vartotojas neegzistuoja",
            });
        }

        next();
    },
};
