import { DataTypes, Model } from 'sequelize';
import { db } from '../../database/db';
import { User } from './User';

export interface RepoPros extends Model {
  id: number;
  name: string;
  description?: string;
  public: boolean;
  slug: string;
}

export const Repo = db.define<RepoPros>('repo', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  repoPublic: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
