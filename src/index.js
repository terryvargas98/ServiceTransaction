const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const util = require('./services/util');
const jwt = require('jsonwebtoken');
require('./config/database');


// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuration
//const port = process.env.port || 3000;
const host = '0.0.0.0';
app.set('port', (process.env.PORT || 5000));


// Routes
const transactionRouter = require('./routes/transaction');
const ensureToken = util.getToken;

// Functions
app.get('/api/transaction/token', (req, res) => {
    const client = req.body;
    const token = jwt.sign({client}, `${process.env.KEY}`);
    res.json(token);
})
app.use('/api/transaction', ensureToken, transactionRouter);

app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});


module.exports = app;