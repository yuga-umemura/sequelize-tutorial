const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const models = require('./models/index.js');
const Company = models.Company;
const app = express();
const port = 8000;

app.set('port', port);
app.use(bodyParser.json());

models.sequelize.sync().then(() => {
  initial();
  console.log('Seems like the backend is running fine...');
}).catch((err) => {
  console.log(err, 'Something went wrong with the operation');
});

require('./routes/employee.route')(app);

function initial() {
  Company.create({
    name: "ABC Company"
  });
  Company.create({
    name: "DEF Company"
  });
  Company.create({
    name: "GHI Company"
  });
}

const server = http.createServer(app);
server.listen(port);
module.exports = app;


