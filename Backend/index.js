//we use "module" in package.json so that we can use import instead of const
import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config({});
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
import path from "path";

const app=express();

const _dirname= path.resolve();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions= {
    origin:'https://jobportal-pg7i.onrender.com',
    credentials:true
}
app.use(cors(corsOptions));

// app.get("/",(req,res)=>{
//     res.send("heyy your server is running successfully");
    
//  })
 
//testing for params
// app.get('/users/:id', (req, res) => {
//     const userId = req.params.id;
//     res.send(`User ID is ${userId}`);
//   });
connectDB();

//api
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);

app.use(express.static(path.join(_dirname, "/Frontend/dist")));
app.get('*', (req,res) => {
    res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
})

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})
