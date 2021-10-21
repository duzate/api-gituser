import { Router } from 'express';

import multerConfig from './config/multer';
import multer from 'multer';

import AuthMiddleware from './app/middlewares/Auth';
import UserController from './app/controllers/UserController';
import RepoController from './app/controllers/RepoController';
import FileController from './app/controllers/FileController';
import AuthController from './app/controllers/AuthController';

const upload = multer(multerConfig);
const routes = Router();

routes.post('/users', upload.single('avatar'), UserController.create);
routes.get('/users/:userID', UserController.findOne);
routes.get('/users', UserController.findAll);

routes.post('/files', upload.single('avatar'), FileController.create);
routes.delete('/files/:fileID', FileController.destroy);
routes.get('/files', FileController.index);

routes.post('/auth', AuthController.store);

routes.use(AuthMiddleware);

routes.put('/users', upload.single('avatar'), UserController.update);
routes.delete('/users', UserController.destroy);

routes.post('/repos', RepoController.create);
routes.get('/repos', RepoController.findAll);
routes.get('/:username/repos', RepoController.index);
routes.get('/repos/:repoID', RepoController.findOne);
routes.put('/repos/:repoID', RepoController.update);
routes.delete('/repos/:repoID', RepoController.destroy);

export default routes;
