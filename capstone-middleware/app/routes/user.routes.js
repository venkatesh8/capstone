const { authJwt } = require('../middlewares');
const controller = require('../controllers/user.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });

  app.get('/api/fields', [authJwt.verifyToken], controller.getAllFields);
  app.get('/api/candidates', [authJwt.verifyToken], controller.getAllCandidates);

  app.post('/api/candidates/create', [authJwt.verifyToken], controller.createNewCandidate);
  app.patch('/api/candidates/:id', [authJwt.verifyToken], controller.updateCandidate);
  app.get('/api/candidates/:id', [authJwt.verifyToken], controller.getCandidate);
  app.delete('/api/candidates/:id', [authJwt.verifyToken], controller.deleteCandidate);
};
