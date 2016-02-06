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
  var store = new Store();
  console.log(requestBody);
  if(requestBody){
    store.id_seller = requestBody.idSeller;
    store.store_name = requestBody.storeName;
    store.description = requestBody.description;
    store.address.zipcode = requestBody.zipcode;
    store.address.address1 = requestBody.address1;
    store.address.address2 = requestBody.address2;
    store.ssm_id = requestBody.ssm_id;
    store.business_number = requestBody.businessNumber;
    store.store_pics_url = requestBody.store_pics_url;
    store.save(function (err, savedStore) {
      if (err) {
        errorHandling(err, errMsg.dbSaveErr);
      }
      res.json(savedStore);
    })
  }
});

router.get("/:idStore", function (req, res, next) {
  Store.findOne({_id: req.params.idStore}, function (err, store) {
    if(err){
      errorHandling(err, errMsg.dbFindErr);
    }
    res.json(store);
  })
})


router.delete("/:idStore", function (req, res, next) {
  Store.findOne({_id: req.params.idStore}).update({fg_delete:true}, function (err, result) {
    if(err){
      errorHandling(err, errMsg.dbFindErr);
    }
    res.json();
  });
})

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
