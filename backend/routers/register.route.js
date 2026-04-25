import express from 'express';
import * as registerController from '../src/app/controllers/register.controller.js';

const router = express.Router();

router.get('/', registerController.renderRegister);
router.post('/', registerController.createNewUser);

export default router;
