import { Request, Response } from 'express';
import { File } from '../models/File';
import { User } from '../models/User';

class UserController {
  async findAll(req: Request, res: Response) {
    const users = await User.findAll({
      include: [{ model: File, as: 'avatar' }],
    });
    return users.length > 0
      ? res.status(200).json(users)
      : res.status(204).send();
  }

  async findOne(req: Request, res: Response) {
    const { userID } = req.params;
    const users = await User.findOne({
      where: { id: userID },
      include: [{ model: File, as: 'avatar' }],
    });
    return users ? res.status(200).json(users) : res.status(204).send();
  }

  async create(req: Request, res: Response) {
    const { originalname: filename, filename: path } = req.file;
    const file = await File.create({
      filename,
      path,
    });
    const { id: avatar_id } = file;

    const { name, email, username, bio } = req.body;

    const emailExists = await User.findOne({
      where: { email: email },
    });
    if (emailExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const usernameExists = await User.findOne({
      where: { username: username },
    });
    if (usernameExists) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const user = await User.create({
      name,
      email,
      username,
      bio,
      avatar_id,
    });
    return res.status(201).json({ user, file });
  }

  async update(req: Request, res: Response) {
    const { originalname: filename, filename: path } = req.file;
    const file = await File.create({
      filename,
      path,
    });

    const { id: avatar_id } = file;
    const { name, email, username, bio } = req.body;

    const { userID } = req.userId;
    await User.update(
      {
        avatar_id,
        name,
        email,
        username,
        bio,
      },
      { where: { id: userID } }
    );
    return res.status(204).send();
  }
  async destroy(req: Request, res: Response) {
    const { userID } = req.params;
    await User.destroy({ where: { id: userID } });
    return res.status(204).send();
  }
}

export default new UserController();
