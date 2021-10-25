import { Request, Response } from 'express';
import { Follow } from '../models/Follow';
import { User } from '../models/User';

class FollowController {
  async create(req: Request, res: Response) {
    const { username } = req.body;

    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    const { id: userId } = user;
    const following = +req.userId;
    if (userId === following) {
      return res.status(401).json({ error: 'Does not is permis follow user' });
    }

    const followed = await Follow.findAll({
      where: { userId: userId, following: following },
    });

    if (followed > []) {
      return res.json({ error: 'Is already following user ' });
    }

    const follow = await Follow.create({
      userId,
      following,
    });

    return res.status(200).json(follow);
  }

  async index(req: Request, res: Response) {
    const followers = await Follow.findAll();
    return res.status(200).json(followers);
  }

  async findAll(req: Request, res: Response) {
    const following = await Follow.findAll({
      where: { following: req.userId },
    });

    return res.status(200).json(following);
  }

  async findUser(req: Request, res: Response) {
    const { username } = req.params;
    const user = await User.findOne({ where: { username: username } });
    const { id: userId } = user;

    const following = await Follow.findOne({
      where: { following: +req.userId, userId },
    });
    return res.status(200).json(following);
  }
}

export default new FollowController();
