'use strict'

module.exports = {
  testTimeout: 30000,
  roots: ['<rootDir>'],
  testMatch: ['<rootDir>/test/(e2e|unit)/!(_)**.(unit|e2e).js'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/test/'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
}
