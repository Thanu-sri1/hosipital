const catchAsync = require("../utils/catchAsync");
const { createNotification } = require("../services/notificationService");

const send = catchAsync(async (req, res) => {
  const notification = await createNotification(req.body);
  res.status(201).json({
    message: "Notification processed successfully",
    notification,
  });
});

module.exports = { send };
