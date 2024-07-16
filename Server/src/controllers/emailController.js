const Mailjet = require("node-mailjet");

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_API_SECRET,
);

exports.sendConfirmationEmail = async (email, username) => {
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "craftifywebmail@gmail.com",
          Name: "No-reply Craftify",
        },
        To: [
          {
            Email: email,
            Name: username,
          },
        ],
        Subject: "Confirmation d'inscription",
        TextPart: `Bonjour ${username}, merci de vous être inscrit!`,
        HTMLPart: `<h3>Bonjour ${username},</h3><p>Merci de vous être inscrit!</p>`,
        CustomID: "AppGettingStartedTest",
      },
    ],
  });

  return request;
};
