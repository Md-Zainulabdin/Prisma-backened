import express from "express"
import cookieParser from "cookie-parser";
require("dotenv").config();

const app = express();
const PORT = 5000;

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie middleware
app.use(cookieParser());

app.listen(PORT, () => console.log(`server is running on PORT: ${PORT}`));