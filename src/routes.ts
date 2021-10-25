import { Router } from 'express';

import multerConfig from './config/multer';
import multer from 'multer';

import { UserRoutes } from './routes/User.Routes';
import { FileRoutes } from './routes/File.Routes';
import { RepoRoutes } from './routes/Repo.Routes';
import { FollowRoutes } from './routes/Follow.Routes';

const upload = multer(multerConfig);
const routes = Router();

UserRoutes(routes, upload);
FileRoutes(routes, upload);
FollowRoutes(routes);
RepoRoutes(routes);

export default routes;
