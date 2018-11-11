const inquirer = require('inquirer');
const ora = require('ora');
const Discord = require('discord.js');
const prompts = require('../utils/prompts');

const client = new Discord.Client();
const spinner = ora();

const getGuilds = async client => {
  spinner.start('Finding servers');
  const guilds = await client.guilds.array().map(guild => ({
    name: `${guild.name} (ID: ${guild.id})`,
    value: guild
  }));

  if (!guilds.length) {
    spinner.fail();
    console.error('Please invite your bot to a server');
    process.exit(0);
  }

  spinner.succeed();
  return guilds;
};

const getChannels = async guild => {
  spinner.start('Finding channels');
  const channels = await guild.channels.array()
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
  const { message } = await inquirer.prompt(prompts.messagePrompt);
  await channel.send(message);

  const { again } = await inquirer.prompt(prompts.repeatPrompt);
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
  const { guild } = await inquirer.prompt(prompts.guildPrompt(guilds));

  // Prompt user for channel
  const channels = await getChannels(guild);
  const { channel } = await inquirer.prompt(prompts.channelPrompt(channels));

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