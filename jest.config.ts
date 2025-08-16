import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/shared/lib/tests/setup.ts"],

  testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"],

  collectCoverage: true,
  coverageProvider: "v8",
  coverageReporters: ["text", "html"],
  coverageDirectory: "coverage",

  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
};

export default createJestConfig(config);
