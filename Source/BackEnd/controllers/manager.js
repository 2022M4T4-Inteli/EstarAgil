const express = require('express');
const router = express.Router();

//Reading a manager
router.get('/:manager_name', (req,res,next) => {
    const name_selected = req.params.manager_name;

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

module.exports = router;