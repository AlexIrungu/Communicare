module.exports = {
    roots: ['<rootDir>/src'],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    moduleNameMapper: {
      '^styled-components$': '<rootDir>/node_modules/styled-components/dist/styled-components.browser.cjs.js',
    },
  };
  