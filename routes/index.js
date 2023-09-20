import express from 'express';
import usersRoutes from './users.js';
import cardsRoutes from './cards.js';

const routes = express.Router();

routes.use('/users', usersRoutes)
routes.use('/cards', cardsRoutes)
routes.patch('/*', (req, res) => {
  try {
    res.status(200).send(req)
  } catch (err) {
    if (err.name === 'TypeError') {
      res.status(404).send({ message: 'Неправильный путь' })
    } else {
      res.status(500).send({ message: 'Ошибка на сервере' })
    }
  }
})

export default routes;