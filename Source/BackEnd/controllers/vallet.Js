//Import database
const db = require('../database/db');

//Testando controller
exports.test = (req,res) =>
{
    res.status(200).send({
        message: 'Teste ok'
    })
}

//Adding a vallet
  exports.addVallet = async (req,res) =>{
    const {vallet_name,vallet_last_name,manager_id,rfid_code} = req.body
    const { rows } =  await db.query(
        "INSERT INTO vallet (vallet_name,vallet_last_name,manager_id,rfid_code) VALUES ($1, $2, $3, $4)",
        [vallet_name, vallet_last_name, manager_id, rfid_code]
    );
    res.status(200).send({
        message: 'Vallet added sucessfully',
        body:{
            vallet : {
                vallet_name,vallet_last_name,manager_id,rfid_code
            }
        }
    })
  }
