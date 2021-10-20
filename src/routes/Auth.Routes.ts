import AuthController from '../controllers/AuthController';

export const AuthRoutes = (routes) => {
  routes.post('/auth', AuthController.store);
};
