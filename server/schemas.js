var mongoose = require('mongoose');


var productSchema = new mongoose.Schema({
    "productId": Number,
    "title": String,
    "description": String,
    "price": Number,
    "brand": String,
    "flavored": Boolean,
    "productImages": String
});

var Product = mongoose.model('Product', productSchema);

module.exports.productSchema = productSchema;
module.exports.Product = Product;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

Product.find({}).exec((err, p) => {
    if(err) {
        return console.log('error', err);
    }
    console.log('found', p);
})

let p = new Product({
    "productId": 13,
    "title": "Pure - LaCroix",
    "description": "Pure: crisp, clean, and clear, the blue can is pure, our only unflavored sparkling.",
    "price": 1.99,
    "brand": "LaCroix",
    "flavored": false,
    "productImages": "img/pure.png"
  });

p.save((err) => {
    if(err){
       return console.log('Error', err);
    }
    console.log('saved');
})



// Product.findOne({'productId': 1}).exec((err, p) => {
//     if(err) {
//         return console.log('error', err);
//     }
//     console.log('found', p);
// })

