const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
const nodemailer = require("../service/nodemailer");
const { validationResult } = require("express-validator");
const crypto = require("crypto");
const path = require("path");

dotenv.config();

const secret = process.env.JWT_SECRET;
const tokenLife = process.env.TOKEN_LIFE;

// register a user
exports.Registration = async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  const userName = request.body.userName;
  const email = request.body.email;
  const password = request.body.password;
  const weight = request.body.weight;
  const height = request.body.height;
  const age = request.body.age;
  const goalWeight = request.body.goalWeight;

  try {
    //Check whether user with this email exists or not
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      return response
        .status(400)
        .json({ error: "User with this Email-id already exists" });
    }

    //Create Hashing of password
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    //Create User
    const user = new User({
      userName,
      email,
      password: secPass,
      weight,
      height,
      age,
      goalWeight,
    });

    user.save(async (err, user) => {
      if (err) {
        return response.status(200).json({
          success: false,
          message: "Your request could not be processed. Please try again.",
          severity: "warning",
        });
      }

      var link = process.env.BASE_SERVER_URL + `/api/auth/verify/${user._id}`;

      var message = {
        subject: "signup-authentication",
        text: `Hi ${user.userName} ! Here is your link to verify your account ${link}`,
      };

      await nodemailer.sendEmail(user.email, message);

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, secret);
      response.status(200).json({
        authtoken,
        success: true,
        email: user.email,
        uid: user._id,
        message: `Your registration has been received. Please check the email sent at ${user.email}.`,
        severity: "success",
      });
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

// login
exports.Login = async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  const email = request.body.email;
  const password = request.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return response.status(200).json({
        success: false,
        message:
          "The account does not exist. Please check or register in 30 seconds!",
        severity: "warning",
      });
    }

    if (!user.isVerified) {
      return response.status(200).json({
        success: false,
        message: `Please verify your account by clicking on the email sent at ${email}. Be sure to check the spam box too!  Or, click here to resend verification email.`,
        severity: "info",
      });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user._id };

        jwt.sign(payload, secret, { expiresIn: tokenLife }, (err, token) => {
          response.status(200).json({
            success: true,
            token: `Bearer ${token}`,
            user: {
              id: user._id,
              userName: user.userName,
              email: user.email,
            },
            message: "Login Successful.",
            severity: "success",
          });
        });
      } else {
        response.status(200).json({
          success: false,
          message: "Password Incorrect",
          severity: "error",
        });
      }
    });
  });
};

// verify email of registered user
exports.Verification = async (request, response) => {
  const user = await User.findById(request.params.id);
  // console.log(user);

  if (user) {
    user.isVerified = true;
    await user.save();
    var link = process.env.BASE_CLIENT_URL + `/login`;
    const Filepath = path.join(__dirname, "../views/verified.html");
    console.log(Filepath);
    response.sendFile(Filepath);
    // response.status(200).json({ sucess: true });
  } else {
    response
      .status(200)
      .json({ success: false, error: "Could not find User." });
  }
};

// forget the password
exports.ForgetPassword = async (request, response) => {
  const email = request.body.email;

  User.findOne({ email }, (err, existingUser) => {
    if (err || existingUser === null) {
      return response.status(200).json({
        success: false,
        message: "Your email is not Registered.",
        severity: "error",
      });
    }

    crypto.randomBytes(48, (err, buffer) => {
      const resetToken = buffer.toString("hex");
      if (err) {
        return response.status(200).json({
          success: false,
          message: "Your request could not be processed. Please try again.",
          severity: "info",
        });
      }

      existingUser.resetPasswordToken = resetToken;
      existingUser.resetPasswordExpires = Date.now() + 3600000;

      existingUser.save(async (err) => {
        if (err) {
          return response.status(200).json({
            success: false,
            message: "Your request could not be processed. Please try again.",
            severity: "info",
          });
        }
        var link =
          process.env.BASE_SERVER_URL +
          `/api/auth/resetpassword?token=${resetToken}`;

        var message = {
          subject: "Reset Password",
          text: `<p>We heard that you lost the password.</p> <p>Don't worry, use the link below to reset it.</p>
          <p>Press <a href=${link}>here</a></p>`,
        };

        await nodemailer.sendEmail(existingUser.email, message);

        response.status(200).json({
          success: true,
          message:
            "Please check your email for the link to reset your password.",
          severity: "success",
        });
      });
    });
  });
};

// reset the password by token
exports.ResetPassword = async (request, response) => {
  User.findOne(
    {
      resetPasswordToken: request.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    },
    (err, resetuser) => {
      if (!resetuser) {
        return response.status(200).json({
          success: false,
          message:
            "Your token has expired. Please attempt to reset your password again.",
          severity: "warning",
        });
      }
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(request.body.newpassword, salt, (err, hash) => {
          if (err) {
            return response.status(200).json({
              success: false,
              message:
                "Your request could not be processed as entered. Please try again.",
              severity: "info",
            });
          }

          request.body.newpassword = hash;

          resetuser.password = request.body.newpassword;
          resetuser.resetPasswordToken = undefined;
          resetuser.resetPasswordExpires = undefined;

          resetuser.save(async (err) => {
            if (err) {
              return response.status(200).json({
                success: false,
                message:
                  "Your request could not be processed as entered. Please try again.",
                severity: "info",
              });
            }

            var message = {
              subject: "Reset Confirmation",
              text: "Your Password changed successfully. Please login with your new password",
            };
            await nodemailer.sendEmail(resetuser.email, message);

            response.status(200).json({
              success: true,
              message:
                "Password changed successfully. Please login with your new password.",
              severity: "success",
            });
          });
        });
      });
    }
  );
};

// reset the account
exports.ResetAccount = async (request, response) => {
  const email = request.body.email;
  const password = request.body.password;

  User.findOne({ email }, (err, existingUser) => {
    if (err || existingUser === null) {
      return response.status(200).json({
        success: false,
        error:
          "Your request could not be processed as entered. Please try again.",
      });
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(request.body.password, salt, (err, hash) => {
        if (err) {
          return response.status(200).json({
            success: false,
            error:
              "Your request could not be processed as entered. Please try again.",
          });
        }

        request.body.password = hash;

        existingUser.passport = request.body.password;

        existingUser.save(async (err) => {
          if (err) {
            return response.status(200).json({
              success: false,
              error:
                "Your request could not be processed as entered. Please try again.",
            });
          }

          await nodemailer.sendEmail(existingUser.email, "reset-confirmation");

          response.status(200).json({
            success: true,
            message:
              "Password changed successfully. Please login with your new password.",
          });
        });
      });
    });
  });
};

// resending Email for verification
exports.ResendVerificationEmail = async (request, response) => {
  User.findOne({ email: request.params.email }).then(async (user) => {
    if (!user) {
      response
        .status(200)
        .json({ success: false, error: "Email Not Registered" });
    } else if (user.isVerified == true) {
      response
        .status(200)
        .json({ success: false, error: "Email Already Verified" });
    } else {
      var link = process.env.BASE_SERVER_URL + `/auth/verify/${user._id}`;

      var message = {
        subject: "Resend Email for Verification",
        text: `Hi ${user.userName}! Here is your link to verify your account ${link}`,
      };

      await nodemailer.sendEmail(user.email, message);

      response.status(200).json({
        success: true,
        email: user.email,
        uid: user._id,
        message: "Email send successfully.",
      });
    }
  });
};
