const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const UserRoutes = require('./routes/routes.js')

dotenv.config();
const PORT = process.env.PORT || 3000;
const connectDB = require('./db/Db.js');
const cors = require('cors');

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"));
app.use('/api/v3/users', UserRoutes);
app.use(cookieParser())
app.use(cors());
connectDB();

app.get('/', (req, res) =>{
    res.send("sever is working")
})

app.listen(PORT, () => {
    console.log(`Server is Listening at ${PORT}`)
})