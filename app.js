import helmet from 'helmet';
import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import routes from './routes/index';

dotenv.config();

const app = express();
const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

app.use(helmet());

app.use((req, res, next) => {
  req.user = {
    _id: '6508519313a62f6213b1466e',
  };

  next();
});

app.use(express.json());
app.use(routes);

async function connect() {
  await mongoose.connect(MONGO_URL);
  app.listen(PORT);
}

connect();
