//Import libraries
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

//Creating routes path
const managerRoute = require('./controllers/manager');
const valletRoute = require('./controllers/vallet');
const serviceRoute = require('./controllers/service');

//Monitoring requests in console
app.use(morgan('dev'));

//Accept data in JSON format
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());

// Setup cors
app.use((req,res,next) =>{
    res.header('Acces-Control-Allow-Origin','*');
    res.header(
        'Acces-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).send({});
    }
    next();
})

//Calling routes path
app.use('/manager', managerRoute);
app.use('/vallet',valletRoute);
app.use('/service', serviceRoute);

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