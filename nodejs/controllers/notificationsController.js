const models = {
    notificationsModel: require("../models/notificationsSchema"),
};

module.exports = {
    notificationsAllSeen: async (req, res) => {
        const { owner } = req.body;

        try {
            const notifications = await models["notificationsModel"]
                .updateMany(
                    { owner: owner },
                    { $set: { seen: true } },
                    { new: true }
                )
                .find({}, {}, { limit: 10 })
                .sort({ _id: -1 });

            return res.send({
                error: false,
                message: "All notifications set to seen",
                notifications: notifications,
            });
        } catch (error) {
            console.log(error);
            return res.send({ error: true, message: error });
        }
    },

    notificationSeen: async (req, res) => {
        const { _id } = req.body;

        try {
            const notification = await models[
                "notificationsModel"
            ].findOneAndUpdate(
                { _id: _id },
                { $set: { seen: true } },
                { new: true }
            );

            return res.send({
                error: false,
                message: "Notification set to seen",
                notification: notification,
            });
        } catch (error) {
            console.log(error);
            return res.send({ error: true, message: error });
        }
    },

    getAllNotifications: async (req, res) => {
        let { limit, owner } = req.params;

        if (!/\d/.test(limit) || owner.includes("$"))
            return res.send({ error: true, message: "Error" });

        let filter = {};

        if (owner !== "0") {
            filter = { owner: owner };
        }

        const notifications = await models["notificationsModel"]
            .find(filter, {}, { limit: Number(limit) })
            .sort({ _id: -1 });

        return res.send({ error: false, notifications: notifications });
    },

    getNotification: async (req, res) => {
        const { _id } = req.params;

        if (_id.includes("$"))
            return res.send({ error: true, message: "Error" });

        const notification = await models["notificationsModel"].findOne({
            _id: _id,
        });

        return res.send({ error: false, notification: notification });
    },
};
