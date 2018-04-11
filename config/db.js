const credlog = require('./cred').credlog;
const credpass = require('./cred').credpass;

module.exports = {
    url : 'mongodb://'+credlog+':'+credpass+'@ds111885.mlab.com:11885/recettatordb'
  };