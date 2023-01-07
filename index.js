const express = require("express");
const cors = require("cors");
const register = require("./Routes/register");
const login = require("./Routes/login");

const app = express();
const port = process.env.PORT || 3015;



app.use(cors());

app.get("/", (req, res) => {
    res.json("RUBIXE SERVER");
});

app.use("/register", register);

app.use("/login", login);

app.listen(port, () => {
    console.log("Rubixe Server Live");
});


