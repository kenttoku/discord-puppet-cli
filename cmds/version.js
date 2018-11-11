const { version } = require('../package.json');

const displayVersion = () => {
  console.log(`v${version}`);
};

module.exports = displayVersion;