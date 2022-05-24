//autor: Igor Ďurica

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;
const router = require('./routes.js');
app.use(cors({
    origin: '*'
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('', router)

//express server
app.listen(PORT, ()=>{
    console.log("Server running.")
});
