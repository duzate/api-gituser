import { Request, Response } from 'express';
import { File } from '../models/File';

class FileController {
  async create(req: Request, res: Response) {
    const { originalname: filename, filename: path } = req.file;
    const file = await File.create({
      filename,
      path,
    });
    return res.status(201).json(file);
  }
  async index(req: Request, res: Response) {
    const file = await File.findAll();
    return res.status(200).json(file);
  }
  async update(req: Request, res: Response) {
    const { fileID } = req.params;
    await File.update(req.body, { where: { id: fileID } });
    return res.status(204).send();
  }
  async destroy(req: Request, res: Response) {
    const { fileID } = req.params;
    await File.destroy({ where: { id: fileID } });
    return res.status(204).send();
  }
}

export default new FileController();
