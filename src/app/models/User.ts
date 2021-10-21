import { DataTypes, Model } from 'sequelize';
import { db } from '../../database/db';
import { File } from './File';
import { Repo } from './Repo';

export interface UserPros extends Model {
  id: number;
  name: string;
  email: string;
  username: string;
}

export const User = db.define<UserPros>('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  bio: {
    type: DataTypes.STRING,
  },
});

User.belongsTo(File, {
  constraints: true,
  foreignKey: 'avatar_id',
  as: 'avatar',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

User.hasMany(Repo, {
  sourceKey: 'id',
  foreignKey: 'repos_id',
  as: 'owner',
});

Repo.belongsTo(User, {
  foreignKey: 'repos_id',
  as: 'owner',
});
