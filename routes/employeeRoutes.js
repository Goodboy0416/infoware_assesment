const express = require('express');
const {
  createEmployee,
  listEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

const router = express.Router();

router.post('/employees', createEmployee);
router.get('/employees', listEmployees);
router.get('/employees/:id', getEmployee);
router.put('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);

module.exports = router;
