const jwt = require('jsonwebtoken');
const db = require('../database/db');

//Verifying the JSON web token

exports.verifym = (req,res,next) => {
    const token = req.headers.authorization;
    if(!token){
        res.status(401).send({
            error: "User not signed in",
        });
    }
    jwt.verify(token, process.env.SECRET_KEY,(err,decoded) =>{
        if(err){
            res.status(400).send({
                error: "User not signed in",
            })
        }
        else{
            const userEmail = decoded.email;
            db
            .query("Select * FROM manager WHERE email = $1",[userEmail])
            .then((info) => {
                if (info.rows.length === 0){
                    res.status(400).send({
                        error: "User not registered"
                    })
                }
            })
        }
    })
} 