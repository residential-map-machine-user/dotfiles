var request = require('request');

request({
  method: 'POST',
  url: 'http://65ab36d1.ngrok.io/v1/stores/56b43e7ade8f32db52eb5cf6/items',
  body: "{ \"idCategory\":\"12312\", \"itemName\":\"Elena 6036 Premium Bag with Lock and Key Set (Black)\", \"description\":\"Elena 6036 Premium Bag with Lock and Key Set (Black)\", \"retailPrice\":\"888.00\", \"discountPrice\":\"2,999.00\", \"itemStatus\":\"00001\", }"
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
