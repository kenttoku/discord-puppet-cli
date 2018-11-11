const inquirer = require('inquirer');
const ora = require('ora');
const Discord = require('discord.js');
const client = new Discord.Client();
const spinner = ora();

const { TOKEN } = require('../config/config');
const questions = [
  {
    type: 'confirm',
    name: 'askAgain',
    message: 'Continue?',
    default: true
  }
];

const test = [];
for (let i=0; i<100; i++) {
  test.push(`test${i}`);
}

const guildQuestions = guilds => ([
  {
    type: 'list',
    name: 'guild',
    message: 'Select a server',
    choices: guilds
  }
]);

const getGuilds = async client => {
  spinner.start('Finding servers');
  const guilds = await client.guilds.array().map(guild => ({
    name: `${guild.name} (ID: ${guild.id})`,
    value: { id: guild.id, name: guild.name }
  }));

  if (!guilds.length) {
    spinner.fail();
    console.error('Please invite your bot to a server');
    process.exit(0);
  }

  spinner.succeed();
  return guilds;
};

const getChannels = async(client, guildId) => {
  spinner.start('Finding channels');
  const guild = await client.guilds.find(guild => guild.id === guildId);
  const channels = guild.channels.array()
    .filter(channel => channel.type === 'text')
    .map(channel => ({
      name: `${channel.name} (ID: ${channel.id})`,
      value: { id: channel.id, name: channel.name }
    }));

  spinner.succeed();
  return channels;
};

const ask = async client => {
  // Prompt user For guild (server)
  const guilds = await getGuilds(client);
  const { guild } = await inquirer.prompt(guildQuestions(guilds));

  // Prompt user for channel
  const channels = await getChannels(client, guild.id);
  console.log(channels);

  const answers = await inquirer.prompt(questions);
  if (answers.askAgain) {
    ask();
  } else {
    spinner.start('Logging out');
    await client.destroy();
    spinner.succeed();
    process.exit(0);
  }
};

const start = async token => {
  spinner.start('Logging in');
  token = token || TOKEN;

  try {
    await client.login(token);
    spinner.succeed();
    ask(client);
  } catch (e) {
    spinner.fail('Unable to log in');
    process.exit(1);
  }
};

module.exports = start;