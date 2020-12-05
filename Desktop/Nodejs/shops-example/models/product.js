const Cart = require('./cart');
const db = require('../util/db');


module.exports = {
  fetchAll: ()=> db.load('SELECT * FROM products'),
  getProductByID: (id) => db.load(`SELECT * FROM products WHERE id = ${id}`),
  edit(entity)
  {
    const condition= {id:entity.productId};
    return  db.patch(entity,condition,'products');
  },
  delete(productId)
  {
    const condition={id:productId};
    return db.del(condition,'products');
  },
  save(product) {
    const id=Math.random();
    entity={
      id:id,
      ...product
    };
    console.log(entity);
    return db.add(entity,'products');
  }
}





