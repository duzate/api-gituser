import { Router } from 'express';

import multerConfig from './config/multer';
import multer from 'multer';

import { FileRoutes } from './routes/File.Routes';
import { UserRoutes } from './routes/User.Routes';

const upload = multer(multerConfig);
const routes = Router();

UserRoutes(routes, upload);
FileRoutes(routes, upload);

export default routes;
