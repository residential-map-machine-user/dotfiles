var express = require('express');
var router = express.Router({ mergeParams: true });
var User = require('../model/UserModel');
var Seller = require('../model/SellerModel');
var Buyer = require('../model/BuyerModel');
var Store = require('../model/StoreModel');
var util = require('../routes/util');
var errMsg = require('../routes/config/err.json');
var Item = require('../model/ItemModel');



/**
 * v1/usersに対するhandler usersを返す
 *
 * @returns {undefined}
 */
router.get('/:idStore/items/:idItem', function(req, res, next) {
  Item.findOne({id_store: req.params.idStore, _id:req.params.idItem}, function (err, item) {
    if (err) {
      errorHandling(err, errMsg.dbFindErr);
    }
    res.json(item);
  })
});

/**
 * v1/usersに対するhandler usersを返す
 *
 * @returns {undefined}
 */
router.delete('/:idStore/items/:idItem', function(req, res, next) {
  Item.findOneAndRemove({id_store: req.params.idStore, _id:req.params.idItem}, function (err, result) {
    res.json(result);
  });
});

/**
 * v1/usersに対するhandler usersを返す
 *
 * @returns {undefined}
 */
router.put('/:idStore/items/:idItem', function(req, res, next) {
  Item.findOneAndRemove({id_store: req.params.idStore, _id:req.params.idItem}, function (err, result) {
    res.json(result);
  });
});

/**
 * v1/usersに対するhandler usersを返す
 *
 * @returns {undefined}
 */
router.put('/:idStore/items/:idItem', function(req, res, next) {
  Item.findOneAndRemove({id_store: req.params.idStore, _id:req.params.idItem}, function (err, result) {
    res.json(result);
  });
});

/**
 * v1/usersに対するhandler usersを返す
 *
 * @returns {undefined}
 */
router.get('/:idStore/items', function(req, res, next) {
  Item.find({id_store: req.params.idStore}, function (err, items) {
    if (err) {
      errorHandling(err, errMsg.dbFindErr);
    }
    res.json(items);
  })
});

/**
 * v1/usersに対するhandler usersを返す
 *
 * @returns {undefined}
 */
router.post('/:idStore/items', function (req, res, next) {
  var item = new Item();
  console.log("items registe is called");
  var requestBody = req.body;
  console.log(requestBody);
  if(requestBody){
    item.id_store = req.params.idStore;
    item.item_name = requestBody.itemName;
    item.description = requestBody.description;
    item.price.retail_price = requestBody.retailPrice;
    item.price.discount_price = requestBody.discountPrice;
    item.id_category = requestBody.itemCategory;
    item.save(function (err, item) {
      if(err){
        errorHandling(err, errMsg.dbSaveErr);
      }
      res.json(item);
    })
  }else{
    res.json({error:"error"});
  }
});


/**
 * v1/usersに対するhandler usersを返す
 *
 * @returns {undefined}
 */
router.get('/', function(req, res, next) {
  Store.find({}, function (err, stores) {
    if (err) {
      errorHandling(err, errMsg.dbFindErr);
    }
    res.json(stores);
  })
});

/**
 * v1/usersに対するhandler usersを返す
 *
 * @returns {undefined}
 */
router.post('/', function (req, res, next) {
  var requestBody = req.body;
  var store = new Store();
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
