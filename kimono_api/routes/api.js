var express = require('express');
var router = express.Router();
var sellerRoute = require('../routes/sellers');
var buyerRoute = require('../routes/buyers');
var oauthRoute = require('../routes/oauthROPC.js');
var storeRoute = require('../routes/stores.js');
var itemRoute = require('../routes/items.js');
router.get('/', function(req, res, next) {
  res.send('Hello this is Kimono Restful api!');
});
router.use('/sellers', sellerRoute);
router.use('/items', itemRoute);
router.use('/buyers', buyerRoute);
router.use('/oauth2', oauthRoute);
router.use('/stores', storeRoute);
module.exports = router;
