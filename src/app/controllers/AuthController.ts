import { Request, Response } from 'express';
import { File } from '../models/File';
import { User } from '../models/User';

class AuthController {
  async store(req: Request, res: Response) {
    const { username } = req.body;

    const user = await User.findOne({
      where: { username },
      include: [{ model: File, as: 'avatar' }],
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    const { id } = user;
    return res.json({
      user,
      token: `${id} ${Date.now()}`,
    });
  }
}

export default new AuthController();
