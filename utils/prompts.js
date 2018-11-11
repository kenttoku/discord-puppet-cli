const guildPrompt = guilds => ([
  {
    type: 'list',
    name: 'guild',
    message: 'Select a server',
    choices: guilds
  }
]);

const channelPrompt = channels => ([
  {
    type: 'list',
    name: 'channel',
    message: 'Select a channel',
    choices: channels
  }
]);

const messagePrompt = [
  {
    type: 'input',
    name: 'message',
    message: 'Enter your message'
  },
];

const repeatPrompt = [
  {
    type: 'confirm',
    name: 'again',
    message: 'Send another message?',
    default: true
  }
];

module.exports = {
  guildPrompt,
  channelPrompt,
  messagePrompt,
  repeatPrompt
};