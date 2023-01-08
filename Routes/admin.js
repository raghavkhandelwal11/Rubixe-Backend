require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const {MongoClient} = require("mongodb");
const validator = require("../Controllers/adminval");

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





route.get("/validate", async (req, res) => {
    try{
        const tokenString = req.headers["authorization"];
        let token = tokenString.split(" ")[1];
        if(token.length != 0) {
             await validator(collection, token, res);
        } else {
            res.send("error occured");
        }
    } catch(e) {
        console.log(e);
        res.send("invalid token");
    }
});



module.exports = route;

