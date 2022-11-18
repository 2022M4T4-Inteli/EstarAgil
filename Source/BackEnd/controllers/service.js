const express = require('express');
const router = express.Router();

//Reading service list
router.get('/', (req,res) => {
    res.status(200).send({
        message: 'Service route get is running'
    })
})

//Adding a service
router.post('/', (req,res) =>{
    res.status(200).send({
        message: 'Service route post is running'
    })
})

//Reading a service
router.get('/:service_name', (req,res,next) => {
    const service_id = req.params.service_name;

    if( service_id === 12 ){
        res.status(200).send({
            message: 'The service name is',
            id:  service_id
        });
    }
    else{
        res.status(200).send({
            mensagem: 'Isnt 12'
        })
    }    
})



module.exports = router;