import express from "express"
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.mjs"
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const PORT = 5000;

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie middleware
app.use(cookieParser());


// routes

app.get("/", (req, res) => res.send("Hello World"))
app.use("/api", userRouter)



app.listen(PORT, () => console.log(`server is running on PORT: ${PORT}`));