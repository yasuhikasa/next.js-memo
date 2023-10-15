// jest.config.js
module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },

  // デフォルトでは__tests__ディレクトリがないとテストファイルとして認識されないが、
  // 例えば、テストファイルの命名規則を .test.js や .spec.js としたい場合、Jest の設定で以下のように指定できます。
  // testMatch: [
  //   "**/?(*.)+(spec|test).[jt]s?(x)"
  // ]
};
