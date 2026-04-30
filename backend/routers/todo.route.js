import express from 'express';
import * as todoController from '../src/app/controllers/todo.controller.js';
import { authenticateJWT } from '../src/app/middlewares/auth.middleware.js';

const router = express.Router();
router.use(authenticateJWT);

router.get('/', todoController.getTodos);
router.post('/', todoController.createNewTodo);
router.post('/:id/delete', todoController.deleteTodoById);
router.post('/:id/toggle', todoController.toggleTodoById);
router.post('/:id/update', todoController.updateNewTodo);

export default router;