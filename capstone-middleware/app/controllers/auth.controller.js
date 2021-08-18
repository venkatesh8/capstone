const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role: req.body.role,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ success: false, data: {}, message: err });
      return;
    }

    /**
     * Uncomment if roles need to verify
     */
    // if (req.body.role) {
    //   Role.find(
    //     {
    //       name: { $in: req.body.role },
    //     },
    //     (err, role) => {
    //       console.log(role);
    //       if (err) {
    //         res.status(500).send({ success: false, message: err, data: {} });
    //         return;
    //       }

    //       console.log('before role', user);
    //       user.role = role._id;
    //       user.save((err, user) => {
    //         if (err) {
    //           res.status(500).send({ success: false, data: {}, message: err });
    //           return;
    //         } else {
    //         }
    //         console.log('after role assign', user);

    //         res.send({ success: true, data: { role: `ROLE_${role.name.toUpperCase()}` }, message: `User was registered successfully!` });
    //       });
    //     }
    //   );
    // } else {
    // }

    res.send({ success: true, data: {}, message: `User was registered successfully!` });
  });
};

exports.signin = (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    { __v: 0 }
  ).exec((err, user) => {
    if (err) {
      res.status(500).send({ success: false, data: {}, message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ data: {}, success: false, message: `User Not found.` });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        data: {},
        success: false,
        message: 'Invalid User or Password!',
      });
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        userRole: user.role,
        accessToken: token,
      },
      message: `User successfully logged in.`,
    });
  });
};
