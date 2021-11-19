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

function loadProducts() {
    allProductsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/products.json'), 'utf-8'));
    products = allProductsData.map((product) => {
        return new Product(product.sku, product.name, product.price, product.image);
    })
}

function findAllProductsByNameStartingWith(name) {
    return products.filter(product => product.name.toLowerCase().startsWith(name));
}

app.post('/products', async (req, res) => {
    const { name } = req.body;
    const found = findAllProductsByNameStartingWith(name.toLowerCase());
    res.status(200).json(found);
})

app.use((req, res, next) => {
    res.sendStatus(404);
})

app.listen(port, () => {
    loadProducts();
    console.log("Listening on port: " + port)
})