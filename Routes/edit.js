require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const {MongoClient} = require("mongodb");
const validator = require("../Controllers/midval");
const { Router } = require("express");
const ObjectId = require("mongodb").ObjectId;

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


route.use(parse);

route.post("/update", validator, async (req, res) => {
    try{

        if(Object.keys(req.body).length != 0) {
            try{
                
                let editObj = {};

                if(req.body.name != "") {
                    editObj.name = req.body.name; 
                }

                if(req.body.email != "") {
                    editObj.email = req.body.email; 
                }

                if(req.body.img_url != "") {
                    editObj.img_url = req.body.img_url; 
                }

                const updateResponse = await collection.updateOne(
                    {_id: ObjectId(req.body._id)},
                    {
                        $set: editObj
                    }
                );

                if(updateResponse.acknowledged) {
                    
                    try{
                        const allData = await collection.find().toArray();
                        if(allData) {
                            res.json(allData);
                        } else {
                            res.send("Reload Please");
                        }
                    }catch(e) {
                        res.send("Reload Please")
                    }

                } else {
                    res.send("User Not Found");
                }

            } catch(e) {
                res.send("error occured");
            }
        }

    } catch(e) {
        res.sendStatus(400);
    }
});



route.post("/delete", validator, async (req, res) => {
    try{

        if(Object.keys(req.body).length != 0) {
            const response = await collection.deleteOne({_id: ObjectId(req.body._id)});
            if(response.acknowledged) {
                try{
                    const allData = await collection.find().toArray();
                    if(allData) {
                        res.json(allData);
                    } else {
                        res.send("Reload Please");
                    }
                }catch(e) {
                    res.send("Reload Please")
                }
            }
        }

    }catch(e) {
        res.send("error occured");
    }
});


module.exports = route;

