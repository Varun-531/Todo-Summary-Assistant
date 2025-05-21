const axios = require("axios");

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

const sendSlackMessage = async (message) => {
  try {
    await axios.post(SLACK_WEBHOOK_URL, {
      text: message,
    });
  } catch (error) {
    console.error("Failed to send Slack message:", error.message);
  }
};

module.exports = sendSlackMessage;
