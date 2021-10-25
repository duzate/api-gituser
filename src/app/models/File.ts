import { DataTypes, Model } from 'sequelize';
import { db } from '../../database/db';
import { User } from './User';

export interface FilePros extends Model {
  id: number;
  filename: string;
  path: string;
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
