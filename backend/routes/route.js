const express = require("express");
const router = express.Router();
const {
  Registration,
  Login,
  Verification,
  ForgetPassword,
  ResetPassword,
  UserDetails,
} = require("./auth");
const Mediataion = require("./meditation");
const { body, validationResult } = require("express-validator");
const { Meditation } = require("./meditation");
const { StoreExercise } = require("./exercises");

//Routes from login - Registration
router.post(
  "/auth/register",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Enter a valid Password").isLength({ min: 6 }),
  ],
  Registration
);

router.post(
  "/auth/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  Login
);

router.get("/auth/verify/:id", Verification);

router.post(
  "/auth/forgetpassword",
  [body("email", "Enter a valid Email").isEmail()],
  ForgetPassword
);

router.post("/auth/resetpassword/:token", ResetPassword);

//Routes for meditation
router.post("/meditation", Meditation);

//Routes for exercise
router.post("/storeexercise", StoreExercise);

module.exports = router;
