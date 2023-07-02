const db = require('../models/index.js');
const Employee = db.Employee;
const Company = db.Company;

module.exports = {
  create(req, res) {
    Employee.create({
      name: req.body.name,
      salary: req.body.salary,
      companyId: req.body.companyId,
    }).then(employee => {
      res.send(employee);
    })
  },
  findAll(req, res) {
    Employee.findAll({
      include: [{model: Company}]
    }).then(companies => {
      res.send(companies);
    })
  },
  findOne(req, res) {
    Employee.findOne({
      where: {
        id: req.params.id
      },
      include: [{model: Company}]
    })
    .then(company => {
      res.send(company);
    })
  },
  update(req, res) {
    Employee,update(
      {
        name: req.body.name,
        salary: req.body.salary
      }, {
        where: {id: req.params.id}
      }).then(() => {
        res.status(200).send("Successfully updated a Employee ID: ", + req.params.id);
      });
  },
  delete(req, res) {
    Employee.destroy({
      where: {id: req.params.id}
    }).then(() => {
      res.status(200).send("Successfully deleted a Employee ID: ", req.params.id);
    });
  }
}