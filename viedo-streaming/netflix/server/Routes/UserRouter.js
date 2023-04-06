import express from 'express';

import { deleteUserProfile, loginUser, registerUser, updateUserProfile, changePassword } from '../Controllers/UserController.js';
// import registerUser from '../Controllers/UserController.js';.if i do this registerUser as a default then no need of semicolun

import { protect } from '../middlewares/Auth.js';

const router = express.Router();

// public routes
router.post('/', registerUser);
router.post('/login', loginUser);

// ***** PRIVATE ROUTE *****
router.put('/', protect, updateUserProfile);
router.delete('/', protect, deleteUserProfile);
router.put('/password', protect, changePassword);

export default router;