import UserController from '../app/controllers/UserController';
import AuthMiddleware from '../app/middlewares/Auth';

export const UserRoutes = (routes, upload) => {
  routes.post('/users', upload.single('avatar'), UserController.create);
  routes.get('/users', UserController.findAll);
  routes.get('/users/:userID', UserController.findOne);

  routes.use(AuthMiddleware);
  routes.put('/users', upload.single('avatar'), UserController.update);
  routes.delete('/users/:userID', UserController.destroy);
};
