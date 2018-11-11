# Discord Puppet CLI

A simple cli for controlling your own bot.

## Installation

**Node.js 8.0.0 or newer is required.**
Install using npm.

```
npm install -g discord-puppet-cli
```

## Usage

To use the Discord Puppet CLI, you must first create and add a bot to your server by visiting the [Official Discord Developer Portal](https://discordapp.com/developers/applications/).
* Choose "Create an application"
* Change your application name
* Under settings, choose "Bot"
* Click on the "Add Bot" button
* Confirm that you want to add a bot
* Click to reveal your token - You will need this to use this app
* Invite your bot to a server

```
Usage: discord-puppet [options] [command]

Options:
-v, --version  output the version number
-h, --help     output usage information

Commands:
start <token>
```

## Built With

* [discord.js](https://discord.js.org/#/)
* [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)
* [Commander.js](https://github.com/tj/commander.js/)
* [ora](https://github.com/sindresorhus/ora)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Authors

Discord Puppet CLI is maintained by Kent Tokunaga.
