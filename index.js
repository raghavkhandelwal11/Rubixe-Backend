const express = require("express");
const cors = require("cors");
const register = require("./Routes/register");
const login = require("./Routes/login");
const admin = require("./Routes/admin");
const edit = require("./Routes/edit");

const app = express();
const port = process.env.PORT || 3015;



app.use(cors());

app.get("/", (req, res) => {
    res.json("RUBIXE SERVER");
});

app.use("/register", register);

app.use("/login", login);

app.use("/admin", admin);

app.use("/edit", edit);

app.listen(port, () => {
    console.log("Rubixe Server Live");
});


