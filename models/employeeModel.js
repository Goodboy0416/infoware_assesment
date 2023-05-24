const db = require('../dbConfig');

class Employee {
  static create(employeeData, callback) {
    // Destructuring employeeData object
    const {
      full_name,
      job_title,
      phone_number,
      email,
      address,
      city,
      state,
      primary_name,
      primary_contact_number,
      primary_contact_relationship,
      secondary_name,
      secondary_contact_number,
      secondary_contact_relationship,
    } = employeeData;

    // SQL query to insert employee data into the database
    const query = `
      INSERT INTO employees (
        full_name,
        job_title,
        phone_number,
        email,
        address,
        city,
        state,
        primary_name,
        primary_contact_number,
        primary_contact_relationship,
        secondary_name,
        secondary_contact_number,
        secondary_contact_relationship
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Executing the query with the employee data values
    db.query(
      query,
      [
        full_name,
        job_title,
        phone_number,
        email,
        address,
        city,
        state,
        primary_name,
        primary_contact_number,
        primary_contact_relationship,
        secondary_name,
        secondary_contact_number,
        secondary_contact_relationship,
      ],
      (err, result) => {
        if (err) {
          console.error('Error creating employee:', err);
          return callback(err);
        }
        // Creating a newEmployee object with the inserted employee's data
        const newEmployee = { id: result.insertId, ...employeeData };
        callback(null, newEmployee);
      }
    );
  }

  static getAll(page, limit, callback) {
    // Calculating the offset based on the requested page and limit
    const offset = (page - 1) * limit;
    // SQL query to retrieve employees with pagination
    const query = 'SELECT * FROM employees LIMIT ? OFFSET ?';
    // Executing the query with the limit and offset values
    db.query(query, [limit, offset], (err, rows) => {
      if (err) {
        console.error('Error getting employees:', err);
        return callback(err);
      }
      callback(null, rows);
    });
  }

  static getById(employeeId, callback) {
    // SQL query to retrieve an employee by their ID
    const query = 'SELECT * FROM employees WHERE id = ?';
    // Executing the query with the employee ID value
    db.query(query, [employeeId], (err, rows) => {
      if (err) {
        console.error('Error getting employee:', err);
        return callback(err);
      }
      if (rows.length === 0) {
        // Returning an error message if no employee is found
        return callback({ message: 'Employee not found' });
      }
      callback(null, rows[0]);
    });
  }

  static update(employeeId, updatedData, callback) {
    // Destructuring updatedData object
    const {
      full_name,
      job_title,
      phone_number,
      email,
      address,
      city,
      state,
      primary_name,
      primary_contact_number,
      primary_contact_relationship,
      secondary_name,
      secondary_contact_number,
      secondary_contact_relationship,
    } = updatedData;

    // SQL query to update an employee's data
    const query = `
      UPDATE employees
      SET
        full_name = ?,
        job_title = ?,
        phone_number = ?,
        email = ?,
        address = ?,
        city = ?,
        state = ?,
        primary_name = ?,
        primary_contact_number = ?,
        primary_contact_relationship = ?,
        secondary_name = ?,
        secondary_contact_number = ?,
        secondary_contact_relationship = ?
      WHERE id = ?
    `;

    // Executing the query with the updated employee data values and ID
    db.query(
      query,
      [
        full_name,
        job_title,
        phone_number,
        email,
        address,
        city,
        state,
        primary_name,
        primary_contact_number,
        primary_contact_relationship,
        secondary_name,
        secondary_contact_number,
        secondary_contact_relationship,
        employeeId,
      ],
      (err, result) => {
        if (err) {
          console.error('Error updating employee:', err);
          return callback(err);
        }
        if (result.affectedRows === 0) {
          // Returning an error message if no employee is found
          return callback({ message: 'Employee not found' });
        }
        // Returning the updated employee data
        callback(null, { id: employeeId, ...updatedData });
      }
    );
  }

  static delete(employeeId, callback) {
    // SQL query to delete an employee by their ID
    const query = 'DELETE FROM employees WHERE id = ?';
    // Executing the query with the employee ID value
    db.query(query, [employeeId], (err, result) => {
      if (err) {
        console.error('Error deleting employee:', err);
        return callback(err);
      }
      if (result.affectedRows === 0) {
        // Returning an error message if no employee is found
        return callback({ message: 'Employee not found' });
      }
      // Returning a success message after deleting the employee
      callback(null, { message: 'Employee deleted successfully' });
    });
  }
}

module.exports = Employee;
