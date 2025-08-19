import express from 'express';

import { create, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/UsersController.js';
// import {handleLogin} from '../controllers/LoginController.js';
import { get } from 'mongoose';

const route = express.Router();

route.post('/user', create);
route.get('/users', getAllUsers);
route.get('/user/:id', getUserById);
route.put('/users/:id', updateUser);
route.delete('/users/:id', deleteUser);


export default route;