const Cloud = require("@google-cloud/storage");
const path = require("path");

// Get your key Service
const keyService = path.join(__dirname, "./keys.json");

const { Storage } = Cloud;

const storage = new Storage({
  keyFilename: keyService,
  projectId: process.env.PROJECT_ID,
});

module.exports = storage;
