const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON
app.use(bodyParser.json({ type: "*/*" }));

app.post("/webhook", (req, res) => {
  // Step 1: Handle validation
  if (req.query && req.query.validationToken) {
    console.log("Validation Token (query):", req.query.validationToken);
    return res.status(200).send(req.query.validationToken);
  }

  if (req.body && req.body.validationToken) {
    console.log("Validation Token (body):", req.body.validationToken);
    return res.status(200).send(req.body.validationToken);
  }

  // Step 2: Handle notifications
  if (req.body && req.body.value) {
    req.body.value.forEach(notification => {
      console.log("📨 New Notification:");
      console.log("  Resource:", notification.resource);
      console.log("  Change Type:", notification.changeType);
      console.log("  Subscription ID:", notification.subscriptionId);
    });
  }

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
