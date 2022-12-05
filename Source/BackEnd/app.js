//Import libraries
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

//API Routes
const index = require('./routes/index');
const managerRoute = require('./routes/managerRoutes');
const valletRoute = require('./routes/valletRoutes');
const orderRoute = require('./routes/orderRoutes');

//Monitoring requests in console
app.use(morgan('dev'));

//Accept data in JSON format
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());

// Setup cors
app.use(cors());

//Calling routes
app.use(index);
app.use('/api',managerRoute);
app.use('/api',valletRoute);
app.use('/api',orderRoute);

//Error status
app.use((req,res, next) => {
    const error = new Error('Não encontrado');
    error.status = 404;
    next(error);
 })
 
 app.use((error, req, res, next) => {
     res.status(error.status || 500);
     return res.send({
         error: {
             message : error.message
         }
     })
 })
 

//Export to index
module.exports = app;
