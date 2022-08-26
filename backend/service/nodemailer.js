const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const email = process.env.EMAIL;
const password = process.env.EMAIL_PASSWORD;

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: password,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.sendEmail = async (recipient, message) => {
  try {
    let info = await transporter.sendMail({
      from: email,
      to: recipient,
      subject: message.subject,
      html: message.text,
    });
    return info;
  } catch (err) {
    console.log("error", err);
    return;
  }
};

exports.sendEmailWithAttachment = async (recipient, message, attachments) => {
  try {
    let info = await transporter.sendMail({
      from: email,
      to: recipient,
      subject: message.subject,
      html: message.text,
      attachments,
    });

    return info;
  } catch (err) {
    console.log("error", err);
    return;
  }
};
