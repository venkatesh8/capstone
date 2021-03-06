const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');
const User = db.user;
const Role = db.role;

verifyToken = async (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ success: false, data: {}, message: `No token provided!` });
  }

  await jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ success: false, data: {}, message: `Unauthorized access!` });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ success: false, data: {}, message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.role },
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ success: false, data: {}, message: err });
          return;
        } else {
        }

        if (role.name === 'admin') {
          next();
          return;
        } else {
        }

        res.status(403).send({ success: false, data: {}, message: `Require Admin Role!` });
        return;
      }
    );
  });
};

isManager = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ success: false, data: {}, message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ success: false, data: {}, message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === 'moderator') {
            next();
            return;
          }
        }

        res.status(403).send({ success: false, data: {}, message: `Require Moderator Role!` });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
};
module.exports = authJwt;
