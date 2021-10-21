import { Request, Response, NextFunction } from 'express';
export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, id, data] = authHeader.split(' ');

  const decoded = id;

  req.userId = decoded;

  return next();
};
