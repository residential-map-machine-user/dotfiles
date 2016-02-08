var express = require('express');
var router = express.Router({ mergeParams: true });
var User = require('../model/UserModel');
var Seller = require('../model/SellerModel');
var Buyer = require('../model/BuyerModel');
var Store = require('../model/StoreModel');
var util = require('../routes/util');
var errMsg = require('../routes/config/err.json');
var Item = require('../model/ItemModel');
var ItemColor = require('../model/ItemColorModel.js');
var _ = require('lodash');

/**
 * v1/usersに対するhandler usersを返す
 *
 * @returns {undefined}
 */
router.get("/:idItem/colors/:idColor", function (req, res, next) {
  ItemColor.findOne({_id: req.params.idColor}, function (err, itemColor) {
    if(err){
      errorHandling(err, errMsg.dbFindErr);
    }
    res.json(itemColor);
  })
})

/**
 * v1/usersに対するhandler usersを返す
 *
 * @returns {undefined}
 */
router.delete("/:idItem/colors/:idColor", function (req, res, next) {
  ItemColor.remove({_id: req.params.idColor}, function (err, result) {
    if (err) {
      errorHandling(err, errMsg.dbRemoveError);
    }
    res.json(result);
  })
})

/**
 * v1/usersに対するhandler usersを返す
 *
 * @returns {undefined}
 */
router.get('/:idItem', function(req, res, next) {
  ItemColor.find({id_item: req.params.idItem}, function (err, itemColors) {
    if (err) {
      errorHandling(err, errMsg.dbFindErr);
    }
    res.json(itemColors);
  })
});

/**
 * v1/usersに対するhandler usersを返す
 *
 * @returns {undefined}
 */
router.post('/:idItem', function (req, res, next) {
  //TODO ここの処理ではcolorの配列が入ってくることが考えられる
  var requestBody = req.body;
  console.log(requestBody);
  var colors = requestBody.colors;
  if(!_.isEmpty(requestBody)){
    asyncInsert(colors, req.params.idItem).then(function () {
      res.json({success:"success"});
    }).catch(function (err) {
      res.json(err);
    });
  }
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

/**
 * asyncInsert
 *
 * @param element
 * @returns {undefined}
 */
function asyncInsert(element, idItem){
  var self = null;
  var promise  = new Promise(function(resolve, reject){ 
    resolve(element);
  });
  return promise.then(function loop(ele) {
    if(element.length > 0 && typeof(element) == "object"){
      return new Promise(function (resolve, reject) {
        var itemColor = new ItemColor();
        // itemColor.id_item = req.params.idItem;
        itemColor.color = _.last(element);
        itemColor.id_item = idItem;
        itemColor.save(function (err, save) {
          if(err){
            reject(err);
          }
          resolve(element.pop());
        })
      }).then(loop);
    }
  });
}
module.exports = router;
