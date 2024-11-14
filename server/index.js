const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
    res.send("<h1>Car Management App</h1>")
})

app.listen(PORT, () => {
    console.log(`App is listening on port:${PORT}`);
});