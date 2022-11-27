const db = require('../database/db');

const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");

exports.register = async (req,res) =>{
    const {email,password,manager_name} = req.body
    try{
        const data = await db.query(
            "SELECT * FROM manager WHERE email = $1",
            [email]
        );
        const arr = data.rows;
        if(arr.length != 0){
            res.status(400).send({
                message: "Email already register"
            })
        }
        else{
            bcrypt.hash(password,10,(err, hash) => {
                if(err)
                    res.status(err).json({
                        error: "Server error",
                    });
                const user = {
                    email,
                    password: hash,
                    manager_name,
                }
            let flag = 1;
            const response = db.query(
                "INSERT INTO manager (email, password, manager_name) VALUES ($1, $2, $3)",
                [user.email, user.password, user.manager_name],
                (err) => {
                    if(err){
                        flag = 0;
                        res.status(500).json({
                            error:"Database error",
                        })
                    }
                    else{
                        flag = 1;
                        res.status(200).send({
                            message: "Manager was registered"
                        })
                    }
                })
            })
        }
    }
    catch{
        res.status(500).send({
            error: "Database error while registering user!",
        })
    }
}

exports.login = async (req,res) => {
    const {email, password} = req.body;
    try{
        const data = await db.query(' SELECT * FROM manager WHERE email = $1', [email]);
        const user = data.rows;
        if(user.length === 0){
            res.status(400).send({
                error: "User is not registered",
            });
        }
        else{
                bcrypt.compare(password, user[0].password,(err,result) => {
                    if(err){
                        res.status(500).json({
                            error:"Server error",
                        })
                    }
                    else if ( result === true){
                        const token = jwt.sign({
                            email: email,
                        }, process.env.SECRET_KEY
                        );
                        res.status(200).send({
                            message: "Connected",
                            token: token,
                        })
                    }
                    else if (result != true){
                        res.status(400).send({
                            error: "Incorrect password"
                        })
                    }
                })
        }
    }
    catch{
        res.status(500).send({
            error: "Database error while registering user!",
        })
    }

}
