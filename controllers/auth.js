const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const candidate = await User.findOne({
    email
  });

  if (candidate) {
    // User exist. Check User.
    const passwordResult = bcrypt.compareSync(password, candidate.password);
    if (passwordResult) {
      // Generate token.
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.jwt, {expiresIn: 60 * 1440})

      res.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      res.status(401).json({
        message: "Wrong password. Try again."
      })
    }
  } else {
    // User not found.
    res.status(404).json({
      message: "User with such email not registered"
    });
  }
}

module.exports.register = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const candidate = await User.findOne({
    email
  });

  if (candidate) {
    // User with this email already exist.
    res.status(409).json({
      message: "User with this email already exist."
    })
  } else {
    // Create user
    const salt = bcrypt.genSaltSync(10);
    const user = new User({
      email,
      password: bcrypt.hashSync(password, salt)
    });
    
    try {
      await user.save();
      res.status(201).json(user)
    } catch (e) {
      errorHandler(res, e)
    }
  }
  
}