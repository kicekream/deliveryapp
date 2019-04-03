const express = require("express");
const config = require('config');
const app = express();
const parcels = require("./routes/parcels");
const users = require("./routes/users");
const auth = require('./routes/auth');

if(!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined. use set sendit_jwtPrivateKey=mySecureKey')
    process.exit(1);
}

app.use(express.json());
app.use("/parcels", parcels);
app.use("/users", users);
app.use('/auth', auth);

app.listen("3000", () => console.log("Server Started on port 3000"));
