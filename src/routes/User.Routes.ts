import UserController from '../controllers/UserController';

export const UserRoutes = (routes, upload) => {
  routes.post('/users', upload.single('avatar'), UserController.create);
  routes.get('/users', UserController.findAll);
  routes.get('/users/:userID', UserController.findOne);
  routes.put('/users/:userID', upload.single('avatar'), UserController.update);
  routes.delete('/users/:userID', UserController.destroy);
};
