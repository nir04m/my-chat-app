process.env.NODE_ENV = 'test';

module.exports = {
  transform: {
    "^.+\\.js$": ["babel-jest", { configFile: "./babel.config.cjs" }],
  },
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.js"], // if you need it
};