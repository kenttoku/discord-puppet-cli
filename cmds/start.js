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

const ask = () => {
  inquirer.prompt(questions).then(answers => {
    if (answers.askAgain) {
      ask();
    } else {
      console.log('Logging out...');
      client.destroy()
        .then(() => process.exit(0))
        .catch(err => {
          console.error(err);
          process.exit(1);
        });
    }
  });
};

const start = async token => {
  spinner.start('Logging in');
  token = token || TOKEN;

  try {
    await client.login(token);
    spinner.succeed();
    ask();
  } catch (e) {
    spinner.fail('Unable to log in');
    process.exit(1);
  }
};

module.exports = start;