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
// route.post('/login', handleLogin);




// app.delete('/api/users/:id', (req, res) => {
//   const { id } = req.params;
//   const index = users.findIndex(user => user._id === id);
  
//   if (index === -1) {
//     return res.status(404).json({ message: 'User not found' });
//   }

//   users.splice(index, 1);
//   res.json({ message: 'User deleted successfully' });
// });

export default route;