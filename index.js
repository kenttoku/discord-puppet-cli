const minimist = require('minimist');

// Commands
const version = require('./cmds/version');
const help = require('./cmds/help');

const puppet = () => {
  const args = minimist(process.argv.slice(2));
  let cmd = args._[0] || 'help';
  if (args.version || args.v) {
    cmd = 'version';
  }

  switch (cmd) {
    case 'version':
      version();
      break;
    case 'help':
      help(args);
      break;
    default:
      console.error(`"${cmd}" is not a valid command`);
      break;
  }
};

module.exports = puppet;