const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();
const PORT = process.env.PORT || 8080;
const connectDB = require('./db/Db.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"));

app.use(cookieParser)
app.use(cors());
connectDB();

app.get('/', (req, res) =>{
    res.send("sever is working")
})

app.listen(() => {
    console.log(`Server is Listening at ${PORT}`)
})