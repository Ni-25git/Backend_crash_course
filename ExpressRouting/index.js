const express = require('express');
const app= express();
const userRouter = require('./userRouter');
const todoRouter = require('./todoRouter');
const PORT = 3000;

app.use("/users",userRouter)
app.use("/todos",todoRouter)










app.listen(PORT, ()=>{
    console.log(`server is listening on PORT ${PORT}`)
})