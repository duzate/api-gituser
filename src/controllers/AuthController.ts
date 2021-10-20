import { Request, Response } from 'express';
import { where } from 'sequelize/types';
import { User } from '../database/models/User';

class AuthController {
  async store(req: Request, res: Response) {
    const { username } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const { id, email, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        username,
      },
    });
  }
}

export default new AuthController();
