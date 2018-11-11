require('dotenv').config();

const start = (token) => {
  token = token || process.env.TOKEN;
  console.log(token);
};

module.exports = start;