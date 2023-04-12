import express from 'express';

import { deleteUserProfile, loginUser, registerUser, updateUserProfile, changePassword, getLikedMovies, addLikedMovie, deleteLikedMovies, getUsers, deleteUser } from '../Controllers/UserController.js';
// import registerUser from '../Controllers/UserController.js';.if i do this registerUser as a default then no need of semicolun

import { protect, admin } from '../middlewares/Auth.js';

const router = express.Router();

// public routes
router.post('/', registerUser);
router.post('/login', loginUser);

// ***** PRIVATE ROUTE *****
router.put('/', protect, updateUserProfile);
router.delete('/', protect, deleteUserProfile);
router.put('/password', protect, changePassword);
router.get('/favorites', protect, getLikedMovies);
router.post('/favorites', protect, addLikedMovie);
router.delete('/favorites', protect, deleteLikedMovies);


// ****** ADMIN ROUTE ******
router.get('/', protect, admin, getUsers);
router.delete('/:id', protect, admin, deleteUser)

export default router;