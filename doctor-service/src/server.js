require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const seedDoctors = require("./services/seedDoctors");

const PORT = process.env.PORT || 5002;

const startServer = async () => {
  await connectDB();
  await seedDoctors();
  app.listen(PORT, () => {
    console.log(`Doctor service running on port ${PORT}`);
  });
};

startServer();
