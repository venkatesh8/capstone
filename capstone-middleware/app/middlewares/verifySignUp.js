const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ success: false,  data: {},  message: err });
      return;
    }

    if (user) {
      res.status(400).send({ success: false,  data: {}, message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ success: false,  data: {}, message: err });
        return;
      }

      if (user) {
        res.status(400).send({ success: false,  data: {}, message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (!req.body.role) {
        res.status(400).send({
          success: false,  data: {},
          message: `Failed! 'role' is required.`
        });
        return;
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
