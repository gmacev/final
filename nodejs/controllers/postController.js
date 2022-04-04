const models = {
    postModel: require("../models/postSchema"),
    threadModel: require("../models/threadSchema"),
    userModel: require("../models/userSchema"),
};

module.exports = {
    createPost: async (req, res) => {
        try {
            const { owner, post, threadId } = req.body;

            const threadPost = new models["postModel"]();

            threadPost.owner = owner.toLowerCase();
            threadPost.threadId = threadId;
            threadPost.post = post;
            threadPost.createdTimeStamp = Date.now();

            const response = await threadPost.save();

            await models["threadModel"].findOneAndUpdate(
                { _id: threadId },
                { $inc: { postCount: 1 } }
            );

            await models["userModel"].findOneAndUpdate(
                { email: owner.toLowerCase() },
                { $inc: { postCount: 1 } }
            );

            await models["threadModel"].findOneAndUpdate(
                { _id: threadId },
                { $set: { lastPostTimeStamp: Date.now() } }
            );

            return res.send({
                error: false,
                message: "Post created successfully",
                _id: response._id,
            });
        } catch (error) {
            console.log(error);
            return res.send({ error: true, message: error });
        }
    },
};
