const bcrypt = require("bcrypt");
const models = {
    userModel: require("../models/userSchema"),
};
//const socket = require("../app");
//socket.ioObject.emit("auction", response)

module.exports = {
    registerUser: async (req, res) => {
        try {
            const { email, username, password1 } = req.body;

            const user = new models["userModel"]();
            const hash = await bcrypt.hash(password1, 10);

            user.email = email.toLowerCase();
            user.username = username;
            user.password = hash;
            user.registeredTimeStamp = Date.now();

            await user.save();

            return res.send({
                error: false,
                message: "User registered successfully",
            });
        } catch (error) {
            console.log(error);
            return res.send({ error: true, message: error });
        }
    },

    autoLogin: async (req, res) => {
        try {
            const { email } = req.session;

            const response = await models["userModel"].findOne({
                email: email.toLowerCase(),
            });

            const user = {
                _id: response._id,
                email: response.email,
                username: response.username,
                avatar: response.avatar,
                registeredTimeStamp: response.registeredTimeStamp,
                postCount: response.postCount,
            };

            return res.send({
                error: false,
                message: "Auto logged back in successfully",
                user,
            });
        } catch (error) {
            return res.send({ error: true, message: error });
        }
    },

    login: async (req, res) => {
        try {
            const { email } = req.body;

            const response = await models["userModel"].findOne({
                email: email.toLowerCase(),
            });

            req.session.email = response.email.toLowerCase();

            const user = {
                _id: response._id,
                email: response.email,
                username: response.username,
                avatar: response.avatar,
                registeredTimeStamp: response.registeredTimeStamp,
                postCount: response.postCount,
                showEmail: response.showEmail,
            };

            return res.send({
                error: false,
                message: "Logged in successfully",
                user,
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

    getUsers: async (req, res) => {
        let { count, limit, page } = req.params;

        if (!/\d/.test(count) || !/\d/.test(limit) || !/\d/.test(page))
            return res.send({ error: true, message: "Error" });

        count = Number(count);
        limit = Number(limit);
        page = Number(page) - 1;

        let users = [],
            usersArr = [],
            total = 0;

        if (count === 0) {
            users = await models["userModel"]
                .find({}, {}, { skip: limit * page, limit: limit })
                .sort({ _id: -1 });
            usersArr.push(users);
            usersArr[0].map((user) => (user.password = undefined));
        } else total = await models["userModel"].count();

        return res.send({ error: false, users: usersArr[0], total: total });
    },

    getUser: async (req, res) => {
        const { _id, email } = req.params;

        if (_id.includes("$") || email.includes("$"))
            return res.send({ error: true, message: "Error" });

        let user = {};

        if (_id !== "0") {
            user = await models["userModel"].findOne({ _id: _id });
        } else if (email !== "0") {
            user = await models["userModel"].findOne({ email: email });
        }

        user.password = undefined;

        return res.send({ error: false, user: user });
    },

    changeAvatar: async (req, res) => {
        let response = {};
        try {
            response = await models["userModel"].findOneAndUpdate(
                { email: req.session.email },
                { $set: { avatar: req.body.image } },
                { new: true }
            );
        } catch (e) {
            console.log(e);
            return res.send({ error: true, message: e });
        }

        return res.send({
            error: false,
            message: "Avatar changed successfully",
            avatar: response.avatar,
        });
    },

    changeShowEmail: async (req, res) => {
        let response = {};
        try {
            response = await models["userModel"].findOneAndUpdate(
                { email: req.session.email },
                { $set: { showEmail: req.body.showEmail } },
                { new: true }
            );
        } catch (e) {
            console.log(e);
            return res.send({ error: true, message: e });
        }

        return res.send({
            error: false,
            message: "Show email status changed successfully",
            showEmail: response.showEmail,
        });
    },

    changeUsername: async (req, res) => {
        let response = {};
        try {
            response = await models["userModel"].findOneAndUpdate(
                { email: req.session.email },
                { $set: { username: req.body.username } },
                { new: true }
            );
        } catch (e) {
            console.log(e);
            return res.send({ error: true, message: e });
        }

        return res.send({
            error: false,
            message: "Display name changed successfully",
            username: response.username,
        });
    },
};
