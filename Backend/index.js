import express from 'express';
import cors from 'cors';
import dbConnect from "./config/mongodb.js";
import "dotenv/config";

import donorRouter from './routes/donorRouter.js';

const app = express();
const port = process.env.PORT || 5000;

// DB connect
dbConnect();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('server is running');
});

app.use('/api/donor', donorRouter)




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
