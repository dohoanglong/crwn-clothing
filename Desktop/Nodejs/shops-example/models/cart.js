const db = require('../util/db');
const Product= require('./product');

module.exports={
    fetchAll: ()=> db.load('SELECT * from cart'),
    addProduct: async function(id) {
        const product= await Product.getProductByID(id);
        entity={
            productId:product.id,
            qty:1,
            price:product.price,
            name:product.name
        }
        return db.add(entity,'cart');
    },
    deleteProduct: () => {
        
    }
}