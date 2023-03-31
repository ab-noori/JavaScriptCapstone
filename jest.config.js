module.exports = {
  // other configuration options...
  testEnvironment: 'jsdom',

  moduleNameMapper: {
    '\\.(scss)$': '<rootDir>/__mocks__/styleMock.js',
  },

};