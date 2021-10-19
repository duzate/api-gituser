import express from 'express';
import { db } from './database/db';
import routes from './routes';
const app = express();

app.use(express.json());

app.use(routes);

app.listen(3000, async () => {
  db.sync();
  console.log('Server is running');
});
