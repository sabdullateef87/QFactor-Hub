/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  forceExit: true,
  verbose: true,
  testMatch: ["**/**/*.test.ts"],
};
