import RepoController from '../app/controllers/RepoController';
import AuthMiddleware from '../app/middlewares/Auth';

export const RepoRoutes = (routes) => {
  routes.use(AuthMiddleware);

  routes.post('/repos', RepoController.create);
  routes.get('/repos', RepoController.findAll);
  routes.get('/repos/:repoID', RepoController.findOne);
  routes.get('/:username/repos', RepoController.index);
  routes.put('/repos/:repoID', RepoController.update);
  routes.delete('/repos/:repoID', RepoController.destroy);
};
