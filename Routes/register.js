require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const {MongoClient} = require("mongodb");

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
        if((typeof req.body == "object") && (Object.keys(req.body).legnth != 0)) {
            const userInfo = req.body;
            const hashedPassword = await bcrypt.hash(userInfo.password, 10);
            userInfo.password = hashedPassword;


            try{
                const response = await collection.insertOne(userInfo);
                if(response.acknowledged == true) {
                    res.send("Registered Successfully");
                } else {
                    res.send("failed! please try after sometime");
                }
            } catch(e) {
                console.log(e);
            }
        } else {
            res.sendStatus(400);
        }
    } catch(err) {
        console.log(err);
        res.send("error occured");
    }
});


module.exports = route;

