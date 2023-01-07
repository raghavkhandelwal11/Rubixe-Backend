require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const {MongoClient} = require("mongodb");
const validator = require("../Controllers/validator");

const parse = bodyParser.json();
const route = express.Router();

const url = "mongodb+srv://raghav:rk1212@cluster0.rbzeb6a.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
let collection = null;



const run = async () => {
    await client.connect();

    const db = client.db("Rubixe");
    collection = db.collection("users");
    
}

run();


route.post("/", parse, async (req, res) => {
    try{
        if((typeof req.body == "object") && (Object.keys(req.body).length != 0)) {
            const userInfo = req.body;
            const email = req.body.email;
            try {
                const response = await collection.findOne({email: email});
                if(response) {
                    const result = await bcrypt.compare(req.body.password, response.password);
                    if(result) {
                        response.password = undefined;
                        try{
                            const token = jwt.sign(response, process.env.SECRET_KEY, {expiresIn: "2d"});
                            response.jwt = token;
                            res.json(response);
                        } catch(e) {
                            res.send('error occured');
                        } 
                    }
                } else {
                    res.send("Incorrect Email or Password");
                }

            } catch(e) {
                console.log(e);
                res.send('error occured');
            }
            
        } else {
            res.send('error occured');
        }
    } catch(err) {
        console.log(err);
        res.send("error occured");
    }
});


route.get("/validate", parse, (req, res) => {
    try{
        const tokenString = req.headers["authorization"];
        let token = tokenString.split(" ")[1];
        if(token.length != 0) {
            validator(collection, token, res);
        } else {
            res.send("error occured");
        }
    } catch(e) {
        console.log(e);
        res.send("invalid token");
    }
});



module.exports = route;

