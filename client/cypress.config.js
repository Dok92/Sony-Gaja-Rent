const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'vno57k',
  env: {
    fixturesFolder: false,
    email: 'doslovdok@gmail.com',
    password: '123456',
  },
  e2e: {
    
  },
  chromeWebSecurity: false
});
