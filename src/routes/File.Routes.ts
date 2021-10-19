import FileController from '../controllers/FileController';

export const FileRoutes = (routes, upload) => {
  routes.post('/files', upload.single('avatar'), FileController.create);
  routes.get('/files', FileController.index);
  routes.delete('/files/:fileID', FileController.destroy);
};
