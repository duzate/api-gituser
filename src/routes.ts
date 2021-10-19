import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import FileController from './controllers/FileController';
import UserController from './controllers/UserController';

const routes = Router();
const upload = multer(multerConfig);

//User
routes.post('/users', upload.single('avatar'), UserController.create);
routes.get('/users', UserController.findAll);
routes.get('/users/:userID', UserController.findOne);
routes.put('/users/:userID', upload.single('avatar'), UserController.update);
routes.delete('/users/:userID', UserController.destroy);

routes.post('/files', upload.single('avatar'), FileController.create);
routes.get('/files', FileController.index);
routes.delete('/files/:fileID', FileController.destroy);
export default routes;
