const mongoose = require('mongoose'),
      User     = require('../models/user.js'),
      services  = require('../services');

const SignUp = (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    nickname: req.body.nickname
  });

  user.save((err) => {
    if(err) return res.status(500).send({message: `Error: ${err}`});

    return res.status(201).send({token: services.createToken(user)});
  })
}
const SignIn = (req, res) => {
  User.find({email: req.body.email}, (err, user) => {
    if(err) return res.status(500).send(`Error: ${err}`);
    if(!user) return res.status(404).send({message: `User does not exist.`});

    req.user = user;
    res.status(200).send({
      message: 'You are logged in',
      token: services.createToken(user)
    });
  });
}

module.exports = {
  SignUp,
  SignIn
};