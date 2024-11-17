import express from "express";
import userRouter from "./Routes/user";
import workerRouter from "./Routes/worker";

const app = express();
const port = 3000;


app.use("/api/v1/user", userRouter);
app.use("/api/v1/worker", workerRouter);

app.listen(port, ()=>{
    console.log(`server is running at port ${port}`)
})
