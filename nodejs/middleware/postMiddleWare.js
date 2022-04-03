module.exports = {
    validatePostLength: async (req, res, next) => {
        if (
            !req.body.post ||
            req.body.post ===
                [
                    {
                        type: "paragraph",
                        children: [{ text: "" }],
                    },
                ]
        ) {
            return res.send({
                error: true,
                message: "Post can't be empty",
            });
        }
        next();
    },
};
