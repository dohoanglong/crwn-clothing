const Product = require('../models/product');
const Cart = require('../models/cart');
const { fetchAll } = require('../models/cart');
const { getProductByID } = require('../models/product');

exports.getProducts = async function(req, res, next) {
  try {
    const products= await Product.fetchAll();
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
      });
  } catch(err) {
    console.log('error at getProduct');
    console.log(err);
  }
};

exports.getProduct = async function(req, res, next) {
  const prodId = req.params.productId;
  try
  {
    const product= await Product.getProductByID(prodId);
    res.render('shop/product-details', {
      product,
      pageTitle: product.title,
      path:'/products',
    })
  }
  catch(err) {
    console.log(err);
  }
};

exports.getIndex =async function(req, res, next) {
  try {
    const products= await Product.fetchAll();
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }
  catch(err) {
    console.log('error at getIndex');
    console.log(err);
  };
};
exports.getCart =async function(req, res, next) {
  try {
    const cart= await Cart.fetchAll();
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      cart
    });
  }
  catch(err) {
    console.log('error at getCart');
    console.log(err);
  };
};

exports.postCart = async function(req, res, next) {
  const ret= Cart.addProduct(req.body.productId);
  res.redirect('/cart');
};

exports.postDeleteCart= (req,res,next) => {
  const proId=req.body.productId;
  Cart.deleteProduct(proId);
  res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
