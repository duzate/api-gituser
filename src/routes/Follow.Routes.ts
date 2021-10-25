import FollowController from '../app/controllers/FollowController';

import AuthMiddleware from '../app/middlewares/Auth';

export const FollowRoutes = (routes) => {
  routes.get('/follow', FollowController.index);

  routes.use(AuthMiddleware);
  routes.post('/follow', FollowController.create);
  routes.get('/following', FollowController.findAll);
  routes.get('/following/:username', FollowController.findUser);
};
