const inquirer = require('inquirer');
const ora = require('ora');
const Discord = require('discord.js');

const client = new Discord.Client();
const spinner = ora();

const questions = [
  {
    type: 'confirm',
    name: 'again',
    message: 'Send another message?',
    default: true
  }
];

const guildQuestions = guilds => ([
  {
    type: 'list',
    name: 'guild',
    message: 'Select a server',
    choices: guilds
  }
]);

const channelQuestions = channels => ([
  {
    type: 'list',
    name: 'channel',
    message: 'Select a channel',
    choices: channels
  }
]);

const messageQuestions = [
  {
    type: 'input',
    name: 'message',
    message: 'Enter your message'
  },
];

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
      value: channel
    }));

  if (!channels.length) {
    spinner.fail();
    console.error('No channels found');
    process.exit(0);
  }

  spinner.succeed();
  return channels;
};

const sendMessage = async(channel) => {
  const { message } = await inquirer.prompt(messageQuestions);
  await channel.send(message);

  const { again } = await inquirer.prompt(questions);
  if (again) {
    sendMessage(channel);
  } else {
    spinner.start('Logging out');
    await client.destroy();
    spinner.succeed();
    process.exit(0);
  }
};

const ask = async client => {
  // Prompt user For guild (server)
  const guilds = await getGuilds(client);
  const { guild } = await inquirer.prompt(guildQuestions(guilds));

  // Prompt user for channel
  const channels = await getChannels(client, guild.id);
  const { channel } = await inquirer.prompt(channelQuestions(channels));

  // Promp user for messages
  await sendMessage(channel);
};

const start = async token => {
  spinner.start('Logging in');

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