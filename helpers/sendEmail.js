const sgMail = require("@sendgrid/mail");
const { GRID_API_KEY } = require("../config");
sgMail.setApiKey(GRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "dimaprytyka@gmail.com" };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
