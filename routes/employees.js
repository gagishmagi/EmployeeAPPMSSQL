var express = require('express');
var router = express.Router();
var employeesController = require('../controllers/EmployeesController')

/* GET employees listing. */
router.get('/', employeesController.findAll);

router.get('/:id', employeesController.findOneEmployee);

module.exports = router;
