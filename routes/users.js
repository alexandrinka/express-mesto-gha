import express from 'express';
import {
  createUser, getUserById, getUsers, updateProfileUser, updateAvatarUser,
} from '../controllers/users';

const usersRoutes = express.Router();

usersRoutes.get('/', getUsers);
usersRoutes.get('/:userId', getUserById);
usersRoutes.post('/', createUser);
usersRoutes.patch('/me', updateProfileUser);
usersRoutes.patch('/me/avatar', updateAvatarUser);

export default usersRoutes;
