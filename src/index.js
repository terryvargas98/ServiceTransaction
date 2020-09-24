const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
require('./config/database');


// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuration
const port = process.env.port || 3000;


// Routes
const transactionRouter = require('./routes/transaction');


// Functions
app.use('/api/transaction', transactionRouter);



app.listen(port, () => {
    console.log(`Server run in port ${port}`);

});

module.exports = app;