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

            const threadTitle = await models["threadModel"].findOne(
                { _id: threadId },
                { title: 1 }
            );

            threadPost.threadTitle = threadTitle.title;
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

    getPosts: async (req, res) => {
        let { count, limit, page, owner } = req.params;

        if (!/\d/.test(count) || !/\d/.test(limit) || !/\d/.test(page))
            return res.send({ error: true, message: "Error" });

        count = Number(count);
        limit = Number(limit);
        page = Number(page) - 1;

        let posts = [],
            total = 0;

        let filterQuery = {};

        if (owner !== "0") {
            filterQuery = { owner: owner };
        }

        if (count === 0) {
            posts = await models["postModel"]
                .find(filterQuery, {}, { skip: limit * page, limit: limit })
                .sort({ _id: -1 });
        } else total = await models["postModel"].count();

        console.log(posts, filterQuery, owner, total);

        return res.send({ error: false, posts: posts, total: total });
    },

    getPost: async (req, res) => {
        const { _id } = req.params;

        const post = await models["postModel"].findOne({ _id: _id });

        return res.send({ error: false, post: post });
    },
};
