const Employee = require('../models/employeeModel');
const { getPagination } = require('../utils/pagination');

//Create Employee
function createEmployee(req, res) {
  const employeeData = req.body;

  Employee.create(employeeData, (err, employee) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to create employee' });
    }
    res.status(201).json(employee);
  });
}
//list Employee
function listEmployees(req, res) {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Employee.getAll(offset, limit, (err, employees) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to get employees' });
    }
    res.json(employees);
  });
}

//Get Employee
function getEmployee(req, res) {
  const employeeId = req.params.id;

  Employee.getById(employeeId, (err, employee) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to get employee' });
    }
    res.json(employee);
  });
}

//update Employee
function updateEmployee(req, res) {
  const employeeId = req.params.id;
  const updatedData = req.body;

  Employee.update(employeeId, updatedData, (err, employee) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update employee' });
    }
    res.json(employee);
  });
}

//Delete Employee
function deleteEmployee(req, res) {
  const employeeId = req.params.id;

  Employee.delete(employeeId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete employee' });
    }
    res.json(result);
  });
}

module.exports = {
  createEmployee,
  listEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
