require('dotenv').config();

const start = (args) => {
  let token = args.token || args.t || process.env.TOKEN;
  console.log(token);
};

module.exports = start;