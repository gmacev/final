const models = {
    threadModel: require("../models/threadSchema"),
    postModel: require("../models/postSchema"),
    userModel: require("../models/userSchema"),
};

module.exports = {
    createThread: async (req, res) => {
        try {
            const { owner, title, post } = req.body;

            const thread = new models["threadModel"]();

            thread.owner = owner.toLowerCase();
            thread.title = title;
            thread.createdTimeStamp = Date.now();

            const response = await thread.save();

            const threadPost = new models["postModel"]();

            threadPost.owner = owner.toLowerCase();
            threadPost.threadId = thread._id;
            threadPost.post = post;
            threadPost.createdTimeStamp = Date.now();

            await threadPost.save();

            await models["userModel"].findOneAndUpdate(
                { email: owner.toLowerCase() },
                { $inc: { threadCount: 1, postCount: 1 } }
            );

            return res.send({
                error: false,
                message: "Thread created successfully",
                _id: response._id,
            });
        } catch (error) {
            console.log(error);
            return res.send({ error: true, message: error });
        }
    },
};
