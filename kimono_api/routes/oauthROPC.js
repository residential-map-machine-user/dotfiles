var express = require('express');
var router = express.Router();
var errMsg = require('../routes/config/err.json');
var crypto = require('crypto');
var Token = require("../model/AccessTokenModel");
var Developer = require('../model/DeveloperModel');

/**
 * v1/oauth2/token POST に対するhandle 
 *
 * @returns {undefined}
 */
router.post('/token', function (req, res, next) {
  console.log("/oauth2/token is called");
  var requestBody = req.body;
  console.log(requestBody);
  if(requestBody && requestBody.grant_type == "password"){
    if(requestBody.username && requestBody.password && requestBody.scope && requestBody.scope == "api"){
      var accessToken = new Token();
      //accessTokenの作成
      generateRandomToken(function (err, token) {
        if(err){
          errorHandling(err, errMsg.generateTokenError);
          res.json({error: "generating token error"});
        }
        //accessTokenの保存
        accessToken.access_token = token;
        accessToken.token_type = "bearer";
        accessToken.save(function (err, accessToken) {
          console.log(accessToken);
          res.json(accessToken);
        })
      });
    }else{
      res.json({erroe:"somthing missing request body"});
    }
  }else{
    res.json({error:"grant type is invalid"});
  }
})

/**
 * errorHandling
 *
 * @param err
 * @param msg
 * @returns {undefined}
 */
function errorHandling(err, msg) {
  console.log(err);
  console.log(msg);
}

/**
 * generateRandomToken
 *
 * @param callback
 * @returns {undefined}
 */
function generateRandomToken(callback) {
  crypto.randomBytes(256, function (err, buffer) {
    if(err){
      return callback(err, null);
    }
    callback(null, crypto.createHash('sha1').update(buffer).digest('hex'));
  });
}
module.exports = router;
