import express from 'express';

import { registerUser } from '../Controllers/UserController';

const router = express.Router();

// public routes
router.post('/', registerUser);