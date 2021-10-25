import FileController from '../app/controllers/FileController';
import AuthMiddleware from '../app/middlewares/Auth';

export const FileRoutes = (routes, upload) => {
  routes.use(AuthMiddleware);

  routes.post('/files', upload.single('avatar'), FileController.create);
  routes.get('/files', FileController.index);
  routes.delete('/files/:fileID', FileController.destroy);
};
