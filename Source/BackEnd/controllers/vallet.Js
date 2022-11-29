//Import database
const db = require('../database/db');


//Adding a vallet according to manager id params
exports.addVallet = async (req,res) =>{
    try{
        const {manager_id} = req.params
        const {vallet_name,rfid_code} = req.body
        const { rows } =  await db.query(
            "INSERT INTO vallet (vallet_name,fk_manager_id,rfid_code) VALUES ($1, $2, $3)",
            [vallet_name,manager_id, rfid_code]
        );
        res.status(200).send({
            message: 'Manager added sucessfully',
            body:{
                vallet : {
                    vallet_name,rfid_code
                },
                manager:{
                    manager_id
                }
            }
        })
    } catch{
        res.status(500).send({
            error: "Database error while registering user!",
        })
    }
}

// //View vallets
exports.valletsByManager = async (req,res) =>
{   
    try{
        const {manager_id} = req.params
        const response = await db.query('SELECT * FROM vallet WHERE fk_manager_id = $1 ORDER BY vallet_name ASC',[manager_id]);
        res.status(200).send(response.rows);
    } catch{
        res.status(500).send({
            error: "Database error while registering user!",
        })
    }
}

//View vallets
exports.valletsById = async (req,res) =>
{
    try{
        const {manager_id,vallet_id} = req.params
        const response = await db.query('SELECT * FROM vallet WHERE fk_manager_id = $1 AND vallet_id = $2',
        [manager_id,vallet_id]);
        res.status(200).send(response.rows);
    } catch{
        res.status(500).send({
            error: "Database error while registering user!",
        })
    }
}

//Delete vallets
exports.deleteValletById = async (req, res) => {
    try{
        const {manager_id,vallet_id} = req.params
        const response = await db.query('DELETE FROM vallet WHERE fk_manager_id = $1 AND vallet_id = $2',
        [manager_id,vallet_id]);
        res.status(200).send({message:'Vallet deleted successfully!'})
    }catch{
        res.status(500).send({
            error: "Database error while registering user!",
        })
    }
}

// //Update vallet
exports.updateValletById = async (req,res) =>{
    const {manager_id,vallet_id} = req.params
    const {vallet_name, rfid_code} = req.body;
    const {rows} = await db.query(
        'UPDATE vallet SET vallet_name = $1, rfid_code = $2 WHERE fk_manager_id = $3 AND vallet_id = $4',
        [vallet_name, rfid_code, manager_id, vallet_id]
    );
    res.status(200).send({
        message: " The vallet data was updated!"
    })
}

