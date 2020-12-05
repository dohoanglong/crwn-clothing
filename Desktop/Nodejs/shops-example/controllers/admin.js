const { fetchAll } = require('../models/cart');
const { getProductByID } = require('../models/product');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.getEditProduct = async function(req, res, next) {
  const prodId = req.params.productId;
  try
  {
  const product= await Product.getProductByID(prodId);
  res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/products',
      formsCSS: true,
      productCSS: true,
      product
  });
  }catch(err) {
    console.log('error at getProductByID');
    console.log(err);
  }
};

exports.postEditProduct = async function(req, res, next) {
  const prod=req.body;
  const ret= await Product.edit(prod);
  res.redirect('/admin/products');
};

exports.postDeleteProduct = async function(req, res, next) {
  const prod=req.body;
  const ret= await Product.delete(prod.productId);
  res.redirect('/admin/products');
};

exports.postAddProduct = async function(req, res, next) {
  const ret= Product.save(req.body);
  res.redirect('/');
};

exports.getProducts = async function(req, res, next) {
  try
  {
    const products= Product.fetchAll();
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }catch(err) {
    console.log('error at getProducts');
    console.log(err);
  }
};
