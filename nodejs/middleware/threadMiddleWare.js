module.exports = {
    validateTitleLength: async (req, res, next) => {
        if (req.body.title.length <= 0) {
            return res.send({
                error: true,
                message: "Title can't be empty",
            });
        }

        if (req.body.title.length >= 64) {
            return res.send({
                error: true,
                message: "Title can't be longer than 64 characters",
            });
        }

        next();
    },
};
