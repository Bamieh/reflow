const parseCaps = require('../parse-caps');
exports.command = 'appium'
exports.describe = 'manage appium'

exports.builder = {
  nodepath: {
    alias:'nodePath',
    type: 'string',
    description: 'Path to nodeconfig json file.',
  },
  // devices: {
  //   type: 'boolean',
  //   default: false,
  //   description: 'Show list of connected devices.',
  // }
}

exports.handler = function (config) {
  const Appium = require('reflow-appium');
  const appiumInstance = new Appium();
  return appiumInstance.connect(config);
}
