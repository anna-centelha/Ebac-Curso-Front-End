const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/relatorios',
    overwrite: true,
    html: true,
    json: false,
    timestamp: 'ddmmyyyy_HHMMss'
  }
});
