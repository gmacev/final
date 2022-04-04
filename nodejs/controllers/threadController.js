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

    getThreads: async (req, res) => {
        let { count, limit, page, owner } = req.params;

        if (!/\d/.test(count) || !/\d/.test(limit) || !/\d/.test(page))
            return res.send({ error: true, message: "Error" });

        count = Number(count);
        limit = Number(limit);
        page = Number(page) - 1;

        let threads = [],
            total = 0;

        let filterQuery = {};

        if (owner !== "0") {
            filterQuery = { owner: owner };
        }

        if (count === 0) {
            threads = await models["threadModel"]
                .find(filterQuery, {}, { skip: limit * page, limit: limit })
                .sort({ _id: -1 });
        } else total = await models["threadModel"].count();

        console.log(threads, filterQuery, owner, total);

        return res.send({ error: false, threads: threads, total: total });
    },

    getThread: async (req, res) => {
        const { _id } = req.params;

        const thread = await models["threadModel"].findOne({ _id: _id });

        return res.send({ error: false, thread: thread });
    },
};
