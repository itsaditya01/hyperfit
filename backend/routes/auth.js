const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const User = require("../models/User");
const nodemailer = require("../auth/services/nodemailer");

dotenv.config();

const secret = process.env.JWT_SECRET;
const tokenLife = process.env.TOKEN_LIFE;

// register a user
exports.Registration = async (request, response) => {
  const name = request.body.name;
  const email = request.body.email;
  const password = request.body.password;
  const weight = request.body.weight;
  const height = request.body.height;
  const goalweight = request.body.goalweight;

  User.findOne({ email }, async (err, existingUser) => {
    if (existingUser) {
      return response.status(200).json({
        success: false,
        message: `An account already exists with ${email}.  Login in now or select forgot password.`,
        severity: "info",
      });
    }

    const user = new User({
      name,
      email,
      password,
      weight,
      height,
      goalweight,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return response.status(200).json({
            success: false,
            message: "Your request could not be processed. Please try again.",
            severity: "warning",
          });
        }
        user.password = hash;

        user.save(async (err, user) => {
          if (err) {
            return response.status(200).json({
              success: false,
              message: "Your request could not be processed. Please try again.",
              severity: "warning",
            });
          }

          var link = process.env.BASE_SERVER_URL + `/auth/verify/${user._id}`;

          var message = {
            subject: "signup-authentication",
            text: `Hi ${user.name} ! Here is your link to verify your account ${link}`,
          };

          await nodemailer.sendEmail(user.email, message);

          response.status(200).json({
            success: true,
            email: user.email,
            uid: user._id,
            message: `Your registration has been received.  Please check the email sent at ${user.email}.`,
            severity: "success",
          });
        });
      });
    });
  });
};

// login
exports.Login = async (request, response) => {
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
              name: user.name,
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
  User.findByIdAndUpdate(
    request.params.id,
    { isVerified: true },
    (err, data) => {
      if (err) {
        response
          .status(200)
          .json({ success: false, error: "Could not find User." });
      } else {
        var link = process.env.BASE_CLIENT_URL + `/?uid=${request.params.id}`;
        response.redirect(link);
      }
    }
  );
};

// forget the password
exports.ForgetPassword = async (request, response) => {
  const email = request.body.email;

  User.findOne({ email }, (err, existingUser) => {
    if (err || existingUser === null) {
      return response
        .status(200)
        .json({
          success: false,
          message: "Your email is not Registered.",
          severity: "error",
        });
    }

    crypto.randomBytes(48, (err, buffer) => {
      const resetToken = buffer.toString("hex");
      if (err) {
        return response
          .status(200)
          .json({
            success: false,
            message: "Your request could not be processed. Please try again.",
            severity: "info",
          });
      }

      existingUser.resetPasswordToken = resetToken;
      existingUser.resetPasswordExpires = Date.now() + 3600000;

      existingUser.save(async (err) => {
        if (err) {
          return response
            .status(200)
            .json({
              success: false,
              message: "Your request could not be processed. Please try again.",
              severity: "info",
            });
        }

        var message = {
          subject: "Reset Password",
          text: `Here your link for Resetting your password ${
            process.env.BASE_CLIENT_URL + "/resetpassword?token=" + resetToken
          }`,
        };

        await nodemailer.sendEmail(existingUser.email, message);

        response
          .status(200)
          .json({
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
        return response
          .status(200)
          .json({
            success: false,
            message:
              "Your token has expired. Please attempt to reset your password again.",
            severity: "warning",
          });
      }
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(request.body.newpassword, salt, (err, hash) => {
          if (err) {
            return response
              .status(200)
              .json({
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
              return response
                .status(200)
                .json({
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

            response
              .status(200)
              .json({
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
      return response
        .status(200)
        .json({
          success: false,
          error:
            "Your request could not be processed as entered. Please try again.",
        });
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(request.body.password, salt, (err, hash) => {
        if (err) {
          return response
            .status(200)
            .json({
              success: false,
              error:
                "Your request could not be processed as entered. Please try again.",
            });
        }

        request.body.password = hash;

        existingUser.passport = request.body.password;

        existingUser.save(async (err) => {
          if (err) {
            return response
              .status(200)
              .json({
                success: false,
                error:
                  "Your request could not be processed as entered. Please try again.",
              });
          }

          await nodemailer.sendEmail(existingUser.email, "reset-confirmation");

          response
            .status(200)
            .json({
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
        text: `Hi ${user.name}! Here is your link to verify your account ${link}`,
      };

      await nodemailer.sendEmail(user.email, message);

      response
        .status(200)
        .json({
          success: true,
          email: user.email,
          uid: user._id,
          message: "Email send successfully.",
        });
    }
  });
};
