/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.js", "**/?(*.)+(spec|test).js"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
