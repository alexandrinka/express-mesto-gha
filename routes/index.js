import express from 'express';
import usersRoutes from './users.js';
import cardsRoutes from './cards.js';

const routes = express.Router();

routes.use('/users', usersRoutes)
routes.use('/cards', cardsRoutes)

export default routes;