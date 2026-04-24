const axios = require("axios");

const client = axios.create({
  timeout: 5000,
});

module.exports = client;
