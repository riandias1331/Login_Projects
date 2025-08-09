import express from 'express';
const router = express.Router();

import { getAllUsers, createUser, getUserById, updateUser, deleteUser, deleteAll} from '../controllers/userController.js';
//    registerUser, 
//     loginUser 

import validator from '../utils/validator.js';

// private
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', validator, createUser);
router.delete('/users/:id', deleteUser);
router.delete('/users/', deleteAll);

// public
router.put('/users/:id', updateUser);
router.post('/register', validator, createUser);
router.post('/login', loginUser);


export default router