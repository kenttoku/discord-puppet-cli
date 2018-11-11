const { TOKEN } = require('../config');

const start = (token) => {
  token = token || TOKEN;
  console.log(token);
};

module.exports = start;