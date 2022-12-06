const db = require('../database/db');

// View order
exports.servicesById = async (req,res) => {
    try{
        const { id_order, fk_rfid_code } = req.params;
        const response = await db.query(
            "SELECT * FROM services WHERE id_order = $1 AND fk_rfid_code = $2",[id_order, fk_rfid_code]
        )
        const data = response.rows
        if(data.length === 0){
            res.status(401).send({
                error: "Order not registered",
            })
        } else {
            res.status(200).send(data);
        }
    } catch{
        res.status(500).send({
            error: "Database error while registering user!",
        })
    }
}

exports.addService = async (req,res) => {
    try{
        const {pick_up_date, deliver_date,prism,fk_rfid_code,distance} = req.body;
        const response = await db.query(
            "INSERT INTO services (pick_up_date, deliver_date, prism, fk_rfid_code,distance) VALUES ($1, $2, $3, $4,$5)",
            [pick_up_date, deliver_date,prism,fk_rfid_code,distance]
        )
        res.status(200).send({
            message: "Order added sucessfully"
        })
    } catch{
        res.status(500).send({
            error: "Database error while registering user!",
        })
    }
}
