import { Request, Response } from 'express';
import { Repo } from '../models/Repo';
import { User } from '../models/User';

class RepoController {
  async findAll(req: Request, res: Response) {
    const repo = await Repo.findAll({
      include: { model: User, as: 'owner' },
    });
    return repo.length > 0
      ? res.status(200).json(repo)
      : res.status(204).send();
  }

  async index(req: Request, res: Response) {
    const repo = await Repo.findAll({
      where: { repos_id: req.userId },
    });
    return res.status(200).json(repo);
  }

  async findOne(req: Request, res: Response) {
    const { repoID } = req.params;
    const repo = await User.findOne({
      where: { id: repoID },
      include: [{ model: User, as: 'owner' }],
    });
    return repo ? res.status(200).json(repo) : res.status(204).send();
  }

  async create(req: Request, res: Response) {
    const { name, description, repoPublic } = req.body;
    const user = await User.findByPk(req.userId);
    const { username, id } = user;
    const slug = `${username}/${name}`;

    const repo = await Repo.create({
      name,
      description,
      repoPublic,
      slug,
      repos_id: id,
    });
    return res.status(201).json({ repo, user });
  }

  async update(req: Request, res: Response) {
    const { name, description, repoPublic } = req.body;
    const user = await User.findByPk(req.userId);
    const { username } = user;
    const slug = `${username}/${name}`;
    const { repoID } = req.params;

    await Repo.update(
      {
        name,
        description,
        repoPublic,
        slug,
      },
      { where: { id: repoID } }
    );
    return res.status(204).send();
  }

  async destroy(req: Request, res: Response) {
    const { repoID } = req.params;
    await User.destroy({ where: { id: repoID } });
    return res.status(204).send();
  }
}

export default new RepoController();
