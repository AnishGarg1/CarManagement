const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () =>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connect Successfully"))
    .catch((error) => {
        console.log("Error:", error);
        console.log("DB connection failed");
        process.exit(1);
    })
} 