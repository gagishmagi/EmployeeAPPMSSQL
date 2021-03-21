var express = require('express');
const { route } = require('.');
var router = express.Router();
var employeesController = require('../controllers/EmployeesController')

/* GET employees listing. */
router.get('/', employeesController.findAll);

router.get('/add', employeesController.addForm);


router.get('/:id', employeesController.findOneEmployee);

router.get('/:id/edit', employeesController.editEmployeeForm);

router.get('/:id/delete', employeesController.deleteEmployee);


router.post('/add', employeesController.addEmployee);

router.post('/:id/update', employeesController.update);


module.exports = router;
