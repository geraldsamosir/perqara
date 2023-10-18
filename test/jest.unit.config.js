'use strict'

const path = require('path')

// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/services/**/*.js'
  ],
  coverageReporters: ['lcov', 'cobertura', 'text-summary'],
  coverageDirectory: 'coverage',
  moduleDirectories: [
    'node_modules',
    path.join(__dirname, '../')
  ],
  moduleFileExtensions: [
    'js', 'node'
  ],
  rootDir: path.join(__dirname, '../'),
  displayName: 'Unit Testing',
  // setup to run in context before jest loaded
  testEnvironment: 'node',
  testMatch: [
    '**/services/**/?(*.)+(test).js?(x)'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  // Indicates whether each individual test should be reported during the run
  verbose: true
}
