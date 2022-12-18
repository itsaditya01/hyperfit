const express = require("express");
const router = express.Router();
const {
  Registration,
  Login,
  Verification,
  ForgetPassword,
  ResetPassword,
  UserDetails,
  GetUser,
} = require("./auth");
const Mediataion = require("./meditation");
const { body, validationResult } = require("express-validator");
const { StoreMeditation, RetrieveMeditation } = require("./meditation");
const {
  StoreExercise,
  RetrieveExercise,
  StoreWeight,
  RetrieveWeight,
  StoreHydration,
  RetrieveHydration,
} = require("./exercises");

//to get user information
router.post("/auth/getuser", GetUser);

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

// router.get("/auth/verify/:id", Verification);

router.post(
  "/auth/forgetpassword",
  [body("email", "Enter a valid Email").isEmail()],
  ForgetPassword
);

router.post("/auth/resetpassword/:token", ResetPassword);

//Routes for meditation
router.post("/storemeditation", StoreMeditation);
router.post("/fetchmeditation", RetrieveMeditation);

//Routes for exercise
router.post("/storeexercise", StoreExercise);
router.post("/fetchexercise", RetrieveExercise);

//Routes for weight
router.post("/storeweight", StoreWeight);
router.post("/fetchweight", RetrieveWeight);

//Routes for hydration
router.post("/storehydration", StoreHydration);
router.post("/fetchhydration", RetrieveHydration);

module.exports = router;
