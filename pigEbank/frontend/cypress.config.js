const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'ved89g',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
