import helmet from 'helmet';
import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import celebrate from 'celebrate';
import rateLimit from 'express-rate-limit';
import routes from './routes/index';
import errorHandler from './middlewares/error-handler';

dotenv.config();

const app = express();
const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json());
app.use(routes);

app.use(celebrate.errors());
app.use(errorHandler);

async function connect() {
  await mongoose.connect(MONGO_URL);
  app.listen(PORT);
}

connect();
