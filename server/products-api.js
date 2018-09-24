// GET::funwater.com/products = Returns json with all product information .
// GET::funwater.com/products/<productID>  =  Returns json with the information from that specific products.
// POST::funwater.com/prdoucts  =  Inserts new product onto the page.
// PUT::funwater.com/products/<productID>  =  Updates information for specified product.
// DELETE::funwater.com/products/<productID>  =  Removes the product with that ID from the data.


const fs = require('fs');
const express = require('express'); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const schema = require('./schemas');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

const app = express();

app.use(bodyParser.json());

const products = JSON.parse(fs.readFileSync('./products.json', 'utf-8'));

//GET:
app.get('/products', (req, res) => {
    schema.Product.find({}).exec((err, products) => {
        if(err) {
            /// throw some kind of error to user here?
            return console.log('error', err);
        }
        res.send({products});
    });
});

//GET certain products based on their ID
app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    // Product.findOne({'productId': id}).exec((err, p) => {
    //     if(err) {
    //         return console.log('error', err);
    //     }
    //     console.log('found', p);
    //     res.send(p);
    // })
    for(let i = 0; i < products.length; i ++){
        if (products[i].productId === id) {
            return res.send(products[i]);
        }
    }
    res.status(404).send('Unable to find id');
});

//Deletes a product
app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const filteredProducts = products.filter(product => product.productId !== id);
    if (filteredProducts.length === products.length) {
        return res.status(404).send('Unable to find ID');
    }
    fs.writeFileSync('./products.json', JSON.stringify(filteredProducts));
    res.send(filteredProducts);
});

//adds a product
app.post('/products', (req, res) => {
    // make something like:{name: "water", id: 000}
    // expecting: {name: "water", id: 000}
    const {productId, title, description, price, brand, flavored, productImages } = req.body;
    if (productId && title && description && price && brand && (req.body.flavored !== undefined) && productImages){
        // success
        const newProduct = {
            productId,
            title,
            description,
            price,
            brand,
            flavored,
            productImages
        }
        products.push(newProduct);
        fs.writeFileSync('./products.json', JSON.stringify(products));
        res.send(newProduct);
    } else {
        return res.status(422).send('Unable to add product');
    }
});

app.put("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const {productId, title, description, price, brand, flavored, productImages} = req.body;
    for(let i = 0; i <= products.length; i++){
      if(id === products[i].productId){
        const updatedProduct = {
          productId,
          title,
          description,
          price,
          brand,
          flavored,
          productImages
        };
        products[i] = updatedProduct;
        fs.writeFileSync("./products.json", JSON.stringify(products));
        res.send(products);
      } 
    }
    res.status(422).send("Unable to find employee")
  });

app.listen(3000);




