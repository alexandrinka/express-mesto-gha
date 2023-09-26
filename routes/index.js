import express from 'express';
import { celebrate, Joi } from 'celebrate';
import usersRoutes from './users';
import cardsRoutes from './cards';
import checkAuthentication from '../middlewares/auth';

const routes = express.Router();

routes.use('/users', checkAuthentication, celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/(https)?:\/\/(www)?[0-9a-z\-._~:/?#[]@!$&'()*\+,;=]+#?$/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), usersRoutes);
routes.use('/cards', checkAuthentication, cardsRoutes);
routes.use('/*', (req, res) => {
  res.status(404).send({ message: 'Неправильный путь' });
});

export default routes;
