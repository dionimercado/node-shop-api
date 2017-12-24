const express       = require('express'),
      bodyParser    = require('body-parser'),
      morgan        = require('morgan'),
      mongoose      = require('mongoose');

mongoose.Promise = global.Promise;

const Product = require('./models/product');

const app = express();
const port = process.env.PORT || 3001;


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/product', (req, res) => {
  res.status(200).send({products: []} );
});

app.post('/api/product', (req, res) => {
  let product = new Product();
  product.name = req.body.name;
  product.image = req.body.image;
  product.price = req.body.price;

  console.log(req.product);

  res.status(201).send({message: 'Product created!'} );
});

app.put('/api/product/:productId', (req, res) => {
  res.send('UPDATE Product Endpoint');
});

app.delete('/api/product/:productId', (req, res) => {
  res.send('DELETE Product Endpoint');
})

mongoose.connect('mongodb://dmercado:bb5702904bb@ds141534.mlab.com:41534/shop-api', { useMongoClient: true }, (err) => {
  if(err) throw new Error();
  return console.log('Connected to MongoDB...');
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});