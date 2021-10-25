import { DataTypes, Model } from 'sequelize';
import { db } from '../../database/db';
import { User } from './User';

export interface FollowProps extends Model {
  userId: number;
  following: number;
}

export const Follow = db.define<FollowProps>('follow', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // 'Movies' would also work
      key: 'id',
    },
  },
  following: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
});
