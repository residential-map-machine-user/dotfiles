var validate = {
  validatePassword: function (v){
    if(v.length > 10 && v.length < 30){
      return v;
    }
  }
};
module.exports = validate;
