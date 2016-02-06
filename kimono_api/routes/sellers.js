var express = require('express');
var router = express.Router();
var Seller = require('../model/SellerModel');
var Buyer = require('../model/BuyerModel');
var Store = require('../model/StoreModel');
var util = require('../routes/util');
var errMsg = require('../routes/config/err.json');
var Favorite = require('../model/FavoriteModel.js');


/**
 * v1/usersに対するhandler usersを返す
 *
 * @returns {undefined}
 */
router.get('/', function(req, res, next) {
 Seller.find({}, function (err, sellers) {
   if(err){
     errorHandling(err, errMsg.dbFindErr);
   }
   res.status(202);
   res.json(sellers);
 });
});


/**
* v1/users/に対するhandler POST 新規作成
*
* @returns {undefined}
*/
router.post('/', function(req, res, next) {
  var seller  = new Seller();
  var requestBody = req.body;
  console.log(requestBody);
  if(requestBody){
    seller.password = requestBody.password;
    seller.mail = requestBody.mail;
    seller.tel = requestBody.tel;
    seller.birthday = requestBody.birthYear.toString();
    seller.sex = requestBody.sex;
    seller.address.zipcode = requestBody.zipcode;
    seller.address.address1 = requestBody.address1;
    seller.address.address2 = requestBody.address2;
    seller.name.first_name = requestBody.firstName;
    seller.name.last_name = requestBody.lastName;
    //データベースに保存
    seller.save(function (err, savedUser) {
      if(err){
        console.log(err);
        errorHandling(err, errMsg.dbFindErr)
      }
      res.json({success:"success"});
      //store document
    });
  }
});

/**
* v1/users/:idに対するhandler usersを返す
*
* @returns {undefined}
*/
router.get('/:id', function(req, res, next) {
  console.log(req.params.id);
  Seller.findOne({_id:req.params.id}).exec(function (err, seller) {
    if(err){
      console.log(err);
      errorHandling(err, errMsg.dbFindErr);
    }
    res.json(seller);
  });
});

/**
* v1/users/:idに対するhandler usersを返す
*
* @returns {undefined}
*/
router.delete('/:id', function(req, res, next) {
  Seller.findOne({_id:req.params.id}).update({fg_delete:true}, function (err, result) {
    if(err){
      errorHadling(err, errMsg.dbDeleteError);
    };
    console.log(err);
    console.log(result);
    res.json(result);
  });
});

/**
* v1/users/:idに対するhandler usersを返す
*
* @returns {undefined}
*/
router.put('/:id', function(req, res, next) {
  var requestBody = req.body;
  var fields = {};
  for (var i in requestBody) {
    fields[i] = requestBody[i];
    console.log(requestBody[i]);
  }
  console.log(requestBody);
  res.json({success:"success"});
});

/**
 * errorHandling
 *
 * @param err
 * @param message
 * @returns {undefined}
 */
function errorHandling(err, message){
  console.log(message);
  console.log(err);
}
module.exports = router;
