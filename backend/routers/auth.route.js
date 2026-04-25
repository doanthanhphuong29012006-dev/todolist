import express from 'express';
import * as authController from '../src/app/controllers/auth.controller.js';

const router = express.Router();

router.get('/login', authController.renderLogin);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

export default router;