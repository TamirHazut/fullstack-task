const fs = require('fs');
const express = require('express');
const path = require('path');
const Product = require('./models/product');
var cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;
app.set('port', port);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

let products = [];
let cart = [];
const max_products_to_return_in_single_search = 20;

function loadProducts() {
    allProductsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/products.json'), 'utf-8'));
    products = allProductsData.map((product) => {
        return new Product(product.sku, product.name, product.price, product.image);
    })
    // for (let i = 0; i < 5; ++i) {
    //     cart.push(products[i]);
    // }
}

function findAllProductsByNameStartingWith(name) {
    const c = products.filter(product => product.name && product.name.toLowerCase().startsWith(name));
    return c;
}

app.post('/cart', async (req, res) => {
    const { search } = req.body;
    const found = findAllProductsByNameStartingWith(search.toLowerCase());
    res.status(200).json(found.slice(0, max_products_to_return_in_single_search));
})

app.put('/cart', async (req, res) => {
    const { id } = req.body;
    const product = products.find(product => product.id == id);
    if (product === undefined) {
        return res.sendStatus(404);
    }
    cart.push(product);
    res.status(200).json(cart);
}) 

app.get('/cart', async (req, res) => {
    res.status(200).json(cart);
})

app.delete('/cart', async (req, res) => {
    const { id } = req.body;
    const productIndex = cart.findIndex(product => product.id == id);
    if (productIndex === -1) {
        return res.sendStatus(404);
    }
    const deletedProducts = cart.splice(productIndex, 1);
    res.status(200).json(deletedProducts); 
})

app.use((req, res, next) => {
    res.sendStatus(404);
})

app.listen(port, () => {
    loadProducts();
    console.log("Listening on port: " + port)
})