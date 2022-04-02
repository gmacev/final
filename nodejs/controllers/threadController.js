const models = {
    threadModel: require("../models/threadSchema"),
};

module.exports = {
    createThread: async (req, res) => {
        try {
            const { owner, title } = req.body;

            const thread = new models["threadModel"]();

            thread.owner = owner.toLowerCase();
            thread.title = title;
            thread.createdTimeStamp = Date.now();

            await thread.save();

            return res.send({
                error: false,
                message: "Thread created successfully",
            });
        } catch (error) {
            console.log(error);
            return res.send({ error: true, message: error });
        }
    },
};
