const express = require('express');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api/employees', employeeRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
