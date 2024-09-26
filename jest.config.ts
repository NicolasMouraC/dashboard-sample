export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)?$": "ts-jest", // Transform TypeScript and JavaScript files
  },
  transformIgnorePatterns: [
    "node_modules/(?!(module-to-transform)/)", // Adjust this if certain modules need transforming
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // Handle @ alias
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS modules
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js", // Mock image imports
  },
};
