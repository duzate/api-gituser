import { DataTypes, Model } from 'sequelize';
import { db } from '../db';

export interface FileAddModel {
  filename: string;
  path: string;
}

export interface FilePros extends Model<FileProps, FileAddModel> {
  id: number;
  filename: string;
  path: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const File = db.define<FilePros>('file', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});
