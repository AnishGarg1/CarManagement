const express = require("express");
const app = express();
const dotenv = require("dotenv");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const fileUpload = require("express-fileupload");

const userRoutes = require("./routes/User");
const carRoutes = require("./routes/Car");
const { cloudinaryConnect } = require("./config/cloudinary");

// Connecting to database
database.dbConnect();

dotenv.config(); // parsing .env file variables

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000", "https://car-trackr.netlify.app/"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)
//cloudinary connection
cloudinaryConnect();

const PORT = process.env.PORT || 4000;

// routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/car", carRoutes);

app.get("/", (req, res) => {
    res.send("<h1>Car Management App</h1>")
})

app.listen(PORT, () => {
    console.log(`App is listening on port:${PORT}`);
});