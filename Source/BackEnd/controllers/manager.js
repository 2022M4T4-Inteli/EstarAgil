const db = require('../database/db');

const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");

//Register managers
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
        //Criptography passwords
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
                "INSERT INTO Manager (email, password, manager_name) VALUES ($1, $2, $3)",
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

//Login with manager account
exports.login = async (req,res) => {
    const {email, password} = req.body;
    try{
        const data = await db.query(' SELECT * FROM manager WHERE email = $1', [email]);
        const user = data.rows;
        //Verify if user is registered in database
        if(user.length === 0){
            res.status(400).send({
                error: "User is not registered",
            });
        }
        else{
            //Verify the password
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

exports.info = async (req,res) => {
    const {id} = req.params
    try{
        const data = await db.query('SELECT manager_name, manager_id, email FROM manager WHERE manager_id = $1', [id]);
        const arr = data.rows;
        if(arr.length === 0){
            res.status(400).send({
                message: "There is no manager with this id"
            })
        } else{
            res.status(200).send(arr)
        }
        
    } catch{
        res.status(500).send({
            error: "Database error while registering user!",
        })
    }
}
