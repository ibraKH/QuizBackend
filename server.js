const express = require("express");
const routers = require("./router/router");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();



const port = process.env.PORT || 3004;

app.use(cors({
    origin: 'https://www.ibra.ws'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routers);


app.get("/", (req, res) => {
    res.send("Hello world :)");
});

app.get("*", (req , res) => {
    res.redirect("https://ibra.ws");
});


app.listen(port, (err) => err ? console.log(err) : console.log("Listening on port :", port));