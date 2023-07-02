'use strict';

const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    name: DataTypes.STRING,
    salary: DataTypes.INTEGER
  }, {});
  Employee.associate = function(models) {
    // associattions can be defined here
    Employee.belongsTo(models.Company, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE',
    })
  };
  return Employee;
}