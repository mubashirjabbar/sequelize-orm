import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/database';

export interface IRole {
  id: number;
  name: string;
}

class Role extends Model<IRole> implements IRole {
  public id!: number;
  public name!: string;

  static associate(models: any) {
    Role.hasMany(models.User, { foreignKey: 'roleId', as: 'users' });
  }
}

Role.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: 'Role name cannot be empty' },
        notNull: { msg: 'Role name cannot be null' },
      },
    },
  },
  {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    timestamps: false,
  }
);

export default Role;
