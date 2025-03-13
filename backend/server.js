import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import adminRouter from './routes/adminRouter.js';
import userRouter from './routes/userRouter.js';


const app = express();
app.use(express.json());
const port=process.env.PORT || 4000;
app.use(cors());
app.use('/api/admin',adminRouter);
app.use('/api/user',userRouter);
app.get('/',(req, res) => { res.send("api working")});
app.listen(port,()=>console.log("Server started",port));

