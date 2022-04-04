const express = require("express");
const router = express.Router();
const {
    registerUser,
    login,
    logout,
    getUsers,
    getUser,
    autoLogin,
    changeAvatar,
    changeShowEmail,
    changeUsername,
} = require("../controllers/userController");

const {
    createThread,
    getThreads,
    getThread,
} = require("../controllers/threadController");

const {
    createPost,
    getPosts,
    getPost,
} = require("../controllers/postController");

const userMiddleware = require("../middleware/userMiddleWare");
const threadMiddleware = require("../middleware/threadMiddleware");
const postMiddleWare = require("../middleware/postMiddleWare");

router.post(
    "/register-user",
    userMiddleware.validateEmail,
    userMiddleware.validateUserRegister,
    userMiddleware.validateUserName,
    registerUser
);

router.post(
    "/login",
    userMiddleware.validateEmail,
    userMiddleware.validateUserLogin,
    login
);

router.post("/logout", userMiddleware.validateIsUserLoggedIn, logout);

router.post("/auto-login", userMiddleware.validateAutoLogin, autoLogin);

router.post(
    "/change-avatar",
    userMiddleware.validateIsUserLoggedIn,
    userMiddleware.validateImage,
    changeAvatar
);

router.post(
    "/change-show-email",
    userMiddleware.validateIsUserLoggedIn,
    changeShowEmail
);

router.post(
    "/change-username",
    userMiddleware.validateIsUserLoggedIn,
    userMiddleware.validateUserName,
    changeUsername
);

router.get("/users/:count/:limit/:page", getUsers);
router.get("/user/:_id/:email", getUser);

router.get("/threads/:count/:limit/:page/:owner", getThreads);
router.get("/thread/:_id", getThread);

router.get("/posts/:count/:limit/:page/:owner/:threadId", getPosts);
router.get("/post/:_id", getPost);

router.post(
    "/create-thread",
    userMiddleware.validateIsUserLoggedIn,
    threadMiddleware.validateTitleLength,
    createThread
);

router.post(
    "/create-post",
    userMiddleware.validateIsUserLoggedIn,
    postMiddleWare.validatePostLength,
    createPost
);

module.exports = router;
