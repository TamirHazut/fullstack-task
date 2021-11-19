const { v4: uuidv4} = require('uuid');

/**
 * 
 * @param {*} id unique id of the product, if empty or undefined then one will be created as a uuid
 * @param {*} name name of the product
 * @param {*} price price of the product in USD($)
 * @param {*} imagePath url to an image of the product
 */
function Product(id, name, price, imagePath) {
    var product = {}
    if (id) {
        product.id = id;
    } else {
        product.id = uuidv4();
    }
    product.name = name;
    product.price = price;
    product.imagePath = imagePath;
    return product;
}

module.exports = Product;