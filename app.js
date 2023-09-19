import express from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import routes from "./routes/index.js";
import process from "process";
dotenv.config();

const app = express();
const {PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb'} = process.env;

app.use((req, res, next) => {
  req.user = {
    _id: '6508519313a62f6213b1466e'
  };

  next();
});

app.use(routes);

async function connect(){
  await mongoose.connect(MONGO_URL)
  console.log(`Server connect db ${MONGO_URL}`);
  app.listen(PORT)
  console.log(`Server listen port ${PORT}`);
}

connect();