var express = require('express');
var router = express.Router();
var Seller = require('../model/SellerModel');
var Buyer = require('../model/BuyerModel');
var Store = require('../model/StoreModel');
var util = require('../routes/util');
var errMsg = require('../routes/config/err.json');
var Favorite = require('../model/FavoriteModel.js');

/**
 * 特定のuserの全お気に入りを取得する
 *
 * @returns {undefined}
 */
router.get("/:userId/favorites", function (req, res, next) {
  console.log(req.params.userId);
  Favorite.find({ id_user:req.params.userId }).exec(function (err, favorites) {
    if(err){
      errorHandling(err, errMsg.dbSaveErr);
    }
    console.log(favorites);
    res.json(favorites);
  })
});


/**
 * 特定のuserの特定のお気に入りを取得する
 *
 * @returns {undefined}
 */
router.get("/:userId/favorites/:favoritId", function (req, res, next) {
  console.log(req.params.userId);
  console.log(favoriteId);
  Favorite.find({ _id:req.params.favoriteId, id_user:req.params.userId }).exec(function (err, favorite) {
    if(err){
      errorHandling(err, errMsg.dbSaveErr);
    }
    console.log(favorite);
    res.json(favorite);
  })
});

/**
* v1/favorites/に対するhandler post 新規作成
*
* @returns {undefined}
*/
router.post('/:userId/favorites/', function(req, res, next) {
  var requestBody = req.body;
  var favorite = new Favorite();
  if("id_item" in requestBody){
    favorite.id_buyer = req.params.userId;
    favorite.id_item = requestBody.id_item;
    favorite.save(function (err, favorite) {
      if(err){
        errorHandling(err, errMsg.dbSaveErr)
      }
      res.json(favorite);
    });
  }else if("id_store" in requestBody){
    favorite.id_buyer = req.params.userId;
    favorite.id_item = requestBody.id_store;
    favorite.save(function (err, favorite) {
      if(err){
        errorHandling(err, errMsg.dbSaverr);
      }
      res.json(favorite);
    });
  }
});


/**
 * v1/usersに対するhandler usersを返す
 *
 * @returns {undefined}
 */
router.get('/', function(req, res, next) {
 Buyer.find({}, function (err, buyers) {
   if(err){
     errorHandling(err, errMsg.dbFindErr);
   }
   res.status(202);
   res.json(buyers);
 });
});


/**
* v1/users/に対するhandler POST 新規作成
*
* @returns {undefined}
*/
router.post('/', function(req, res, next) {
  var buyer = new Buyer();
  var requestBody = req.body;
  console.log(requestBody);
  if(requestBody){
    buyer.password = requestBody.password;
    buyer.mail = requestBody.mail;
    buyer.tel = requestBody.tel;
    buyer.birthday = requestBody.birthYear.toString();
    buyer.sex = requestBody.sex;
    buyer.address.zipcode = requestBody.zipcode;
    buyer.address.address1 = requestBody.address1;
    buyer.address.address2 = requestBody.address2;
    buyer.name.first_name = requestBody.firstName;
    buyer.name.last_name = requestBody.lastName;
    //データベースに保存
    console.log(buyer);
    buyer.save(function (err, savedBuyer) {
      if(err){
        console.log(err);
        errorHandling(err, errMsg.dbFindErr)
      }
      console.log(savedBuyer);
      //store document
      res.json({"success":"sucess"})
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
  Buyer.findOne({_id:req.params.id }).exec(function (err, buyer) {
    if(err){
      console.log(err);
      errorHandling(err, errMsg.dbFindErr);
    }
    console.log(err);
    console.log(buyer);
    res.json(buyer);
  });
});

/**
* v1/users/:idに対するhandler usersを返す
*
* @returns {undefined}
*/
router.delete('/:id', function(req, res, next) {
  Buyer.findOne({_id:req.params.id}).update({fg_delete:true}, function (err, result) {
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
    if(i == "firstName" || i == "lastName"){

    }
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
