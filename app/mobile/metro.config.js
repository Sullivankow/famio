const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');
const config = getDefaultConfig(projectRoot);

// pnpm stores transitive packages in this virtual node_modules directory.
// Metro does not follow it automatically when resolving dependencies of Expo.
config.resolver.nodeModulesPaths = [
  path.join(projectRoot, 'node_modules'),
  path.join(workspaceRoot, 'node_modules'),
  path.join(workspaceRoot, 'node_modules', '.pnpm', 'node_modules'),
];

module.exports = config;
