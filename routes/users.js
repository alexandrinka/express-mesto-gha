import express from 'express';
import { createUser, getUserById, getUsers, updateProfileUser, updateAvatarUser} from '../controllers/users.js';

const usersRoutes = express.Router();

usersRoutes.get('/', getUsers);
usersRoutes.get('/:userId', getUserById);
usersRoutes.post('/', express.json(), createUser);
usersRoutes.patch('/me', express.json(), updateProfileUser);
usersRoutes.patch('/me/avatar', express.json(), updateAvatarUser);

export default usersRoutes;