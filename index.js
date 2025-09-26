// index.js

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());

// Webhook endpoint
app.post("/webhook", (req, res) => {
  const body = req.body;

  // Check if this is a validation request
  if (body && body.validationToken) {
    // Respond with the validation token as plain text
    res.status(200).send(body.validationToken);
    console.log("✅ Validation request received. Responded with token:", body.validationToken);
    return;
  }

  // Otherwise, this is a normal notification from MS Graph
  console.log("📨 Notification received:");
  
  // Print important fields
  if (body.value && Array.isArray(body.value)) {
    body.value.forEach((notification, index) => {
      console.log(`Notification ${index + 1}:`);
      console.log("  Resource:", notification.resource);
      console.log("  Change Type:", notification.changeType);
      console.log("  Client State:", notification.clientState);
      console.log("  Subscription ID:", notification.subscriptionId);
      console.log("  Received Time:", notification.subscriptionExpirationDateTime || "N/A");
    });
  } else {
    console.log(body);
  }

  // Respond with 200 OK
  res.sendStatus(200);
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("Microsoft Graph Webhook Listener is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
