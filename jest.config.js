module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/test/**',
    '!**/server/**',
    '!**/out/**',
    '!**/coverage/**',
    '!**/vendor/**',
    '!**/*.config.{js,jsx}',
    '!**/*.setup.{js,jsx}',
    '!**/jest.setupTest.js',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: -10,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setupTest.js'],
  setupFiles: ['<rootDir>/jest.setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '\\.css$': '<rootDir>/__mocks__/styleMock.js',
  },
  globals: {},
};
