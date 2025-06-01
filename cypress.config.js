const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      allureWriter(on, config);
      return config;
    },
    baseUrl: 'http://localhost:3000',
    defaultCommandTimeout: 20000,     // Targeted increase
    pageLoadTimeout: 90000,          // Handle slow full page load
    video: false,                    // Optional: turn off video recording
    screenshotOnRunFailure: true ,
    experimentalRunAllSpecs: true // Keep screenshots on errors

  },
});
