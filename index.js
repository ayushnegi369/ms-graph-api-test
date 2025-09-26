// server.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8080;

// Microsoft Graph sends JSON notifications
app.use(bodyParser.json());

// This endpoint will handle subscription validation and notifications
app.post("/webhook", (req, res) => {
  const body = req.body;

  // Step 1: Handle validationToken (required when creating subscription)
  if (body.validationToken) {
    console.log("Validation Token received:", body.validationToken);
    // Respond with the validationToken within 5 seconds
    return res.status(200).send(body.validationToken);
  }

  // Step 2: Handle actual notifications
  if (body.value && Array.isArray(body.value)) {
    body.value.forEach(notification => {
      console.log("---- New Notification ----");
      console.log("Resource:", notification.resource);
      console.log("Change Type:", notification.changeType);
      console.log("Client State:", notification.clientState);
      console.log("Subscription ID:", notification.subscriptionId);
      console.log("Received Date:", notification.subscriptionExpirationDateTime);
    });
  } else {
    console.log("Notification body:", body);
  }

  // Must respond 202 Accepted for notifications
  res.sendStatus(202);
});

// Optional: simple GET endpoint to test server
app.get("/", (req, res) => {
  res.send("Microsoft Graph Webhook Server is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
