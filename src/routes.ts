import { Router } from 'express';

import multerConfig from './config/multer';
import multer from 'multer';

import { FileRoutes } from './routes/File.Routes';
import { UserRoutes } from './routes/User.Routes';
import { AuthRoutes } from './routes/Auth.Routes';

const upload = multer(multerConfig);
const routes = Router();

UserRoutes(routes, upload);
FileRoutes(routes, upload);
AuthRoutes(routes);

export default routes;
