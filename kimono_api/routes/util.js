var crypto = require('crypto');
var util = {
  formatBirthday: function (year, month, day) {
    return year + "-" + month + "-" + day;
  },
  generateRandomToken: function (callback) {
    crypto.randomBytes(256, function (err, buffer) {
      if(err){
        return callback(err, null);
      }
      callback(null, crypto.createHash('sha1').update(buffer).digest('hex'));
    });
  }
};
exports.module = util;
