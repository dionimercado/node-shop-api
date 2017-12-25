const jwt    = require('jwt-simple'),
      moment = require('moment');

require('dotenv').config({ path: '../config.env' });


const createToken = (user) => {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  }

  return jwt.encode(payload, process.env.JWT_SECRET);
}

const decodeToken = (token) => {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, process.env.JWT_SECRET);

      if(payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: 'Token has expired.'
        })
      }

      resolve(payload.sub);

    } catch(err) {
      reject({
        status: 500,
        message: 'Invalid Token.'
      })
    }
  });

  return decoded;
}
module.exports = {
  createToken,
  decodeToken
};