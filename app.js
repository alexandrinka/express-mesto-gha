import helmet from 'helmet';
import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import celebrate from 'celebrate';
import routes from './routes/index';
import { login, createUser } from './controllers/users';

dotenv.config();

const app = express();
const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

app.use(helmet());

app.use(express.json());
app.post('/signin', login);
app.post('/signup', createUser);
app.use(routes);

app.use(celebrate.errors());
app.use((err, req, res, next) => {
  if (err.code === 11000) {
    res.status(409).send({ message: 'Пользователь с таким email уже зарегистрирован' });
  } else {
    res.status(err.statusCode).send({ message: err.message });
  }
  res.status(500).send({ message: 'На сервере произошла ошибка' });
  next();
});

async function connect() {
  await mongoose.connect(MONGO_URL);
  app.listen(PORT);
}

connect();
