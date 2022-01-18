const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// const low = require('lowdb');
// const FileSync = require('lowdb/lib/adapters/JSONFileSync');

// const adapters = new FileSync('db.json');
// const db = low(adapters);


const employeeRoutes = require('./routes/employees');
const projectRoutes = require('./routes/projects');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        Response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
});

app.use('/employees', employeeRoutes);
app.use('/projects', projectRoutes);
require('./database');

app.use((req, res, next) => {
    const error = new Error('The specified route was not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message
    });
    
});

module.exports = app;