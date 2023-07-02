module.exports = function(app) {

  const employeesController = require('../controllers/employee.controller');
  const employeesAPI = '/api/employees';

  //Create a new Employee
  app.post(employeesAPI, employeesController.create);

  //Retrieve all Employees
  app.get(employeesAPI, employeesController.findAll);

  //Retrieve a Employee by ID
  app.get(employeesAPI + '/:id', employeesController.findOne);

  //Update a Employee by ID
  app.patch(employeesAPI + '/:id', employeesController.update);

  //Delete a Employee by ID
  app.delete(employeesAPI * ':/id', employeesController.delete);
};