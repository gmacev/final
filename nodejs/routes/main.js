const express = require("express");
const router = express.Router();
const {
    registerUser,
    login,
    logout,
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
router.post("/logout", logout);

module.exports = router;
