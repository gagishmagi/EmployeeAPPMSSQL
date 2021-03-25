var express = require('express');
var router = express.Router();
var apiController = require('../controllers/ApiController')
var jwtMiddleware = require('../middlewares/jwt')

/* RESTFUL API */

router.get('/employees', jwtMiddleware.authenticateToken, apiController.findAll);

router.get('/employees/:id', jwtMiddleware.authenticateToken, apiController.findOneEmployee);

router.post('/employees', jwtMiddleware.authenticateToken, apiController.addEmployee);

router.put('/employees/:id', jwtMiddleware.authenticateToken, apiController.update);

router.patch('/employees/:id', jwtMiddleware.authenticateToken, apiController.update);

router.delete('/employees/:id', jwtMiddleware.authenticateToken, apiController.deleteEmployee);


router.post('/login', apiController.createNewUser);

router.post('/register', apiController.createNewUser);


module.exports = router;
