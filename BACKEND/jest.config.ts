import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  verbose: true,
  testTimeout: 30000,
  forceExit: true,
  detectOpenHandles: true,
  clearMocks: true,
  restoreMocks: true,
  collectCoverageFrom: [
    'src/routes/**/*.ts',
    'src/middleware/**/*.ts',
    '!src/server.ts',
    '!src/seed.ts',
  ],
  coverageReporters: ['text', 'lcov', 'clover'],
};

export default config;
