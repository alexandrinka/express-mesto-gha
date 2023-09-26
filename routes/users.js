import express from 'express';
import {
  getUserById, getUsers, updateProfileUser, updateAvatarUser,
} from '../controllers/users';

const usersRoutes = express.Router();

usersRoutes.get('/', getUsers);
usersRoutes.get('/:userId', getUserById);
usersRoutes.patch('/me', updateProfileUser);
usersRoutes.patch('/me/avatar', updateAvatarUser);

export default usersRoutes;
