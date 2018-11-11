const minimist = require('minimist');

// Commands
const displayHelp = require('./cmds/help');
const displayVersion = require('./cmds/version');
const start = require('./cmds/start');

const puppet = () => {
  const args = minimist(process.argv.slice(2));
  console.log(args);

  let cmd = args._[0] || 'help';

  // version flags: --version, -v
  if (args.version || args.v) {
    cmd = 'version';
  }

  // help flags: --help, -h
  if (args.help || args.h) {
    cmd = 'help';
  }

  switch (cmd) {
    case 'start':
      start(args);
      break;
    case 'version':
      displayVersion();
      break;
    case 'help':
      displayHelp(args);
      break;
    default:
      console.error(`"${cmd}" is not a valid command`);
      break;
  }
};

module.exports = puppet;