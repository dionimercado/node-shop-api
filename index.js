const express       = require('express'),
      bodyParser    = require('body-parser'),
      morgan        = require('morgan'),
      mongoose      = require('mongoose');

// mongoose.Promise = global.Promise;

const Product = require('./models/product');

const app = express();
const port = process.env.PORT || 3001;


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/product', (req, res) => {
  Product.find({}, (err, products) => {
    if(err) return res.status(500).send({message: `Error ${err}`});
    if(!products) return res.status(404).send({message: 'No products found!'});

    res.status(200).send({products} );
  });
});

app.post('/api/product', (req, res) => {
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

});

app.get('/api/product/:productId', (req, res) => {
  Product.findById(req.params.productId, (err, product) => {
    if(err) return res.status(500).send({message: `Error: ${err}`});
    if(!product) return res.status(404).send(`No product found with speficied ID: ${req.params.productId}`);

    res.status(200).send({product});
  });
});

app.put('/api/product/:productId', (req, res) => {
  Product.findByIdAndUpdate(req.params.productId, req.body, {new: true}, (err, productUpdated) => {
    if(err) return res.status(500).send({message: `Errror ${err} `});
    if(!productUpdated) return res.status(404).send({message: `Error: Product ID: ${req.params.productId} not found!`});

    res.status(200).send({product: productUpdated});
  })
});

app.delete('/api/product/:productId', (req, res) => {
  Product.findByIdAndRemove(req.params.productId, (err, product) => {
    if(err) return res.status(500).send({message: `Error: ${err}`});

    res.status(400).send({product});
  });
});

mongoose.connect('mongodb://dmercado:bb5702904bb@ds141534.mlab.com:41534/shop-api', { useMongoClient: true }, (err) => {
  if(err) throw new Error();
  return console.log('Connected to MongoDB...');
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});