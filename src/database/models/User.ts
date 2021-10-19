import { DataTypes } from 'sequelize';
import { db } from '../db';
import { File } from './File';

export const User = db.define('user', {
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
