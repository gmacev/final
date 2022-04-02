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
} = require("../controllers/userController");

const { createThread } = require("../controllers/threadController");

const userMiddleware = require("../middleware/userMiddleWare");
const threadMiddleware = require("../middleware/threadMiddleware");

router.post(
    "/register-user",
    userMiddleware.validateEmail,
    userMiddleware.validateUserRegister,
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

router.get("/users/:count/:limit/:page", getUsers);
router.get("/user/:_id", getUser);

router.post(
    "/create-thread",
    userMiddleware.validateIsUserLoggedIn,
    threadMiddleware.validateTitleLength,
    createThread
);

module.exports = router;
