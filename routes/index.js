import express from 'express';
import usersRoutes from './users';
import cardsRoutes from './cards';

const routes = express.Router();

routes.use('/users', usersRoutes);
routes.use('/cards', cardsRoutes);
routes.use('/*', (req, res) => {
  res.status(404).send({ message: 'Неправильный путь' });
});

export default routes;
