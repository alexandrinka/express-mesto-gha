import express from 'express';

import {
  createCard, deleteCardById, getCards, likeCard, dislikeCard,
} from '../controllers/cards';

const usersRoutes = express.Router();

usersRoutes.get('/', getCards);
usersRoutes.delete('/:cardId', deleteCardById);
usersRoutes.post('/', createCard);
usersRoutes.put('/:cardId/likes', likeCard);
usersRoutes.delete('/:cardId/likes', dislikeCard);

export default usersRoutes;
