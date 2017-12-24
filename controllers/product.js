const Product = require('../models/product');

const getAll = (req, res) => {
  Product.find({}, (err, products) => {
    if(err) return res.status(500).send({message: `Error ${err}`});
    if(!products) return res.status(404).send({message: 'No products found!'});

    res.status(200).send({products} );
  });
}

const getOne = (req, res) => {
  Product.findById(req.params.productId, (err, product) => {
    if(err) return res.status(500).send({message: `Error: ${err}`});
    if(!product) return res.status(404).send(`No product found with speficied ID: ${req.params.productId}`);

    res.status(200).send({product});
  });
}

const create = (req, res) => {
  let product = new Product();

  product.name = req.body.name;
  product.image = req.body.image;
  product.price = req.body.price;
  product.category = req.body.category;
  product.description = req.body.description;

  product.save( (err, productStored) => {
    if(err) res.status(500).send({message: `Error: ${err}`});
    res.status(201).send({product: productStored});
  });
}

const update = (req, res) => {
  Product.findByIdAndUpdate(req.params.productId, req.body, {new: true}, (err, productUpdated) => {
    if(err) return res.status(500).send({message: `Errror ${err} `});
    if(!productUpdated) return res.status(404).send({message: `Error: Product ID: ${req.params.productId} not found!`});

    res.status(200).send({product: productUpdated});
  });
}

const remove = (req, res) => {
  Product.findByIdAndRemove(req.params.productId, (err, product) => {
    if(err) return res.status(500).send({message: `Error: ${err}`});

    res.status(400).send({product});
  });
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
}