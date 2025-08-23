import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  clearMocks: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],

  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],

  collectCoverage: true,
  coverageProvider: 'v8',
  coverageReporters: ['text', 'html'],
  coverageDirectory: 'coverage',

  collectCoverageFrom: ['src/**/*.{ts,tsx}'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default createJestConfig(config)
