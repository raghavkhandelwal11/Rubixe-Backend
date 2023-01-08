require("dotenv").config();
const jwt = require("jsonwebtoken");


const validate = async (collection, token, res) => {
    
    
    try{

    let userData = jwt.verify(token, process.env.SECRET_KEY);
     
    if(userData) {
        
        if((typeof userData == "object") && (Object.keys(userData).length != 0)) {
            
            const response2 = await collection.findOne({email: userData.email});
            if(response2) {
                
                try{
                    const response3 = await collection.find().toArray();
                    if(response3) {
                        res.json(response3);
                    } else {
                        
                        res.send('error occured');
                        
                    }
                } catch(e) {
                    console.error(e);
                    
                    res.send("error occured")
                }
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