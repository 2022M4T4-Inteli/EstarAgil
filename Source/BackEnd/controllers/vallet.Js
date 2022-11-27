//Import database
const db = require('../database/db');


//Adding a vallet
  exports.addVallet = async (req,res) =>{
    const {vallet_name,manager_id,rfid_code} = req.body
    const { rows } =  await db.query(
        "INSERT INTO vallet (vallet_name,manager_id,rfid_code) VALUES ($1, $2, $3)",
        [vallet_name, manager_id, rfid_code]
    );
    res.status(200).send({
        message: 'Manager added sucessfully',
        body:{
            vallet : {
                vallet_name,manager_id,rfid_code
            }
        }
    })
  }

//View vallets
exports.viewVallets = async (req,res) =>
{
    const response = await db.query('SELECT * FROM vallet ORDER BY vallet_name ASC');
    res.status(200).send(response.rows);
}

//View vallets
exports.namesVallets = async (req,res) =>
{
    const response = await db.query('SELECT vallet_name FROM vallet ORDER BY vallet_name ASC');
    res.status(200).send(response.rows);
}

//Delete vallets
exports.deleteValletById = async (req, res) => {
    const id_vallet = parseInt(req.params.id);
    await db.query('DELETE FROM vallet WHERE id_vallet = $1',
    [id_vallet]);
    res.status(200).send({message:'Vallet deleted successfully!'})
}

//Update vallet
exports.updateVallet = async (req,res) =>
{
    const {vallet_name, vallet_status, manager_id, rfid_code, id_vallet} = req.body;
    const response = await db.query(
        'UPDATE vallet SET vallet_name = $1, vallet_status = $2, manager_id = $3, rfid_code = $4 WHERE id_vallet = $5',
        [vallet_name, vallet_status, manager_id, rfid_code, id_vallet]
    );
    res.status(200).send({
        message: " The vallet information was updated!"
    })
}

