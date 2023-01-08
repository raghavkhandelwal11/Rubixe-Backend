require("dotenv").config();
const jwt = require("jsonwebtoken");


const validate = async (req, res, next) => {
    try{
        if(Object.keys(req.body).length != 0) {
            let tokenstr = req.headers["authorization"];
            let token = tokenstr.split(" ")[1];
            const data = jwt.verify(token, process.env.SECRET_KEY);

            if(data) {
                next();
            } else {
                res.send("Invalid Token");
            }

        }
    } catch(e) {
        res.sendStatus(400);
    }
}



module.exports = validate;







module.exports = validate;