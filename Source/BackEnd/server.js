// Import libraries
const { application } = require('express');
const express = require('express');

// Importing app function
const app = require('./app');

const localhost = "127.0.0.1";

//Application port
const port = process.env.PORT || 4005;

const host = process.env.HOST || localhost;

console.clear();

//Printing server status
app.listen(port, host, error => {
    error?
    console.log(`There was an error while starting server...\n ${error}`) :
    console.log(`🚀 Server started successfully. Listening http://${host}:${port}.`)
})
