// Import libraries
const express = require('express');

// Importing app function
const app = require('./app');


//Application port
const port = process.env.PORT || 4005;

console.clear();

//Printing server status
app.listen(port,error => {
    error?
    console.log(`There was an error while starting server...\n ${error}`) :
    console.log(`🚀 Server started successfully. Listening http://localhost:${port}.`)
})