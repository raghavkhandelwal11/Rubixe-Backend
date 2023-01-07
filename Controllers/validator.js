require("dotenv").config();
const jwt = require("jsonwebtoken");


const validate = async (collection, token, res) => {
    try{
    const userData = jwt.verify(token, process.env.SECRET_KEY);
    if(userData) {
        if((typeof userData == "object") && (Object.keys(userData).length != 0)) {
            const response2 = await collection.findOne({email: userData.email});
            if(response2) {
                response2.password = undefined;
                response2.jwt = token;
                res.json(response2);
            } else {
                res.send("invalid token");
            }
        } else {
            res.send("error occured");
        }
    } else {
        res.send("token expired")
    }
    } catch(e) {
        console.log("error occured during validation");
        res.send("error occured");
    }
}


module.exports = validate;