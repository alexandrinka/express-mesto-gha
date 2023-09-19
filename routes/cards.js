import express from 'express';

import bodyParser from 'body-parser';
import { createCard, deleteCardById, getCards, likeCard, dislikeCard } from '../controllers/cards.js';

const usersRoutes = express.Router();

usersRoutes.get('/', getCards);
usersRoutes.delete('/:cardId', deleteCardById);
usersRoutes.post('/', bodyParser.json(), createCard);
usersRoutes.put('/:cardId/likes', likeCard);
usersRoutes.delete('/:cardId/likes', dislikeCard);

export default usersRoutes;