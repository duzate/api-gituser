import { DataTypes, Model } from 'sequelize';
import { db } from '../../database/db';
import { File } from './File';
import { Repo } from './Repo';

export interface UserPros extends Model {
  id: number;
  name: string;
  email: string;
  username: string;
  avatar_id: string;
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

User.afterSave(async (user) => {
  File.destroy({ where: { id: user.get().avatar_id } });
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

User.belongsToMany(User, {
  through: 'follow',
  as: 'following',
});
