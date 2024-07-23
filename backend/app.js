import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import cors from "cors";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingRouter from "./routes/booking-route.js";
dotenv.config();
const app=express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.json())
app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/movie",movieRouter);
app.use("/booking",bookingRouter);

mongoose.connect(`mongodb+srv://rithigaav2021cseb:${process.env.MANGODB_PASSWORD}@cluster0.kesy4io.mongodb.net/`)
.then(()=>{
    app.listen(5000,()=>{
        console.log("Connected to Database Server is running on port 5000");
    })
})
.catch((e)=>console.log(e));

//2:03:20

//rithigaav2021cseb
//BYIF7fWhg9tJWQ7c