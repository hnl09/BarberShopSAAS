/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.ts',
      '!**/src/index.ts',
      '!**/tests/**',
      '!**/node_modules/**',
    ],
    coverageProvider: 'v8',
    coverageThreshold: {
      global: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
    verbose: true,
    forceExit: true,
    clearMocks: true
  };