process.env.NODE_ENV = 'test';

export default {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.js"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};