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

function loadProducts() {
    allProductsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/products.json'), 'utf-8'));
    products = allProductsData.map((product) => {
        return new Product(product.sku, product.name, product.price, product.image);
    })
    for (let i = 0; i < 5; ++i) {
        cart.push(products[i]);
    }
}

function findAllProductsByNameStartingWith(name) {
    return products.filter(product => product.name.toLowerCase().startsWith(name));
}

app.post('/cart', async (req, res) => {
    const { search } = req.body;
    const found = findAllProductsByNameStartingWith(search.toLowerCase());
    res.status(200).json(found);
})

app.put('/cart', async (req, res) => {
    res.status(200).send("Found");
})

app.get('/cart', async (req, res) => {
    res.status(200).json(cart);
})

app.delete('/cart', async (req, res) => {
    const { id } = req.body;
    const productIndex = cart.findIndex(product => product.id == id);
    if (productIndex == -1) {
        res.status(404);
    }
    cart.splice(productIndex, 1);
    res.status(200).send(id); 
})

app.use((req, res, next) => {
    res.sendStatus(404);
})

app.listen(port, () => {
    loadProducts();
    console.log("Listening on port: " + port)
})