const program = require('commander');
const start = require('./cmds/start');
const { version } = require('./package.json');

const puppet = () => {
  program.version(version, '-v, --version');
  program.command('start <token>').action(token => start(token));
  program.parse(process.argv);
};

module.exports = puppet;