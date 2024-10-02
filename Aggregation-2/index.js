import express from 'express';
import connection from './db/db.js';
import universityRouter from "./routes/university.js"
import departmentRouter from "./routes/department.js"
import courseRouter from "./routes/course.js"
const port = process.env.PORT ||4000
const app = express();
app.use(express.json());
app.use("/university",universityRouter)
app.use("/department",departmentRouter)
app.use("/course",courseRouter)


app.listen(port,async()=>{
    await connection
    console.log(`Server is running on http://localhost:${port}`);
});