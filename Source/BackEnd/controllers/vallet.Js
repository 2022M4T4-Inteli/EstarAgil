//Import libraries
const express = require('express');
const router = express.Router();

//Reading vallet list
router.get('/', (req,res) => {
    res.status(200).send({
        message: 'Vallet route get is running'
    })
})

//Adding a vallet
router.post('/', (req,res) =>{
    res.status(200).send({
        message: 'Vallet route post is running'
    })
})

//Reading a vallet
router.get('/:vallet_name', (req,res,next) => {
    const name_selected = req.params.vallet_name;

    if( name_selected === 'Caze'){
        res.status(200).send({
            message: 'The vallet name is',
            id:  name_selected
        });
    }
    else{
        res.status(200).send({
            mensagem: 'Isnt Caze'
        })
    }    
})

// Update the vallet
router.patch('/',(req,res) => {
    res.status(201).send({
        message : 'Vallet route patch is running'
    })
})

// Delete the vallet
router.delete('/',(req,res) => {
    res.status(201).send({
        message : 'Vallet route delete is running'
    })
})

module.exports = router;