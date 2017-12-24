const express = require('express');

ProductCtrl   = require('../controllers/product');

const api = express.Router();

api.get('/product', ProductCtrl.getAll);
api.get('/product/:productId', ProductCtrl.getOne);
api.post('/product', ProductCtrl.create);
api.put('/product/:productId', ProductCtrl.update);
api.delete('/product/:productId', ProductCtrl.remove);

module.exports = api;