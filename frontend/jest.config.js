/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleDirectories: [
    'node_modules'
  ],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  collectCoverageFrom: [
    "src/**/*.ts",
    "src/**/*.tsx",
    "!src/react-app-env.d.ts",
    "!src/index.tsx"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/tests/",
    "@types"
  ],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts']
}
