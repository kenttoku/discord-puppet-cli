const menus = {
  main: `
    puppet-bot [command] <options>

    version ............ show package version
    help ............... show help menu for a command`
};

const help = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0];

  console.log(menus[subCmd] || menus.main);
};

module.exports = help;