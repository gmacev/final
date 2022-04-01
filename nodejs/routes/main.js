const express = require("express");
const router = express.Router();
const {
    registerUser,
    login,
    logout,
    getUsers,
    autoLogin,
} = require("../controllers/userController");

const userMiddleware = require("../middleware/userMiddleWare");

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

router.get("/users/:count/:limit/:page", getUsers);

module.exports = router;
