const express       = require('express'),
      auth          = require('../middlewares/auth'),
      productCtrl   = require('../controllers/product'),
      userCtrl   = require('../controllers/user'),
      api           = express.Router();

api.get('/product', productCtrl.getAll);
api.get('/product/:productId', productCtrl.getOne);
api.post('/product', productCtrl.create);
api.put('/product/:productId', productCtrl.update);
api.delete('/product/:productId', productCtrl.remove);
api.post('/signup', userCtrl.SignUp);
api.get('/private', auth, (req, res) => {
  res.status(200).send({message: 'Tienes acceso a este endpoint'});
});

module.exports = api;