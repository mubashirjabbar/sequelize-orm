'use strict';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

// Define the TypeScript interface for User
export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  profileImage: string;
  roleId: number;
}

class User extends Model<IUser> implements IUser {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public phoneNumber!: string;
  public profileImage!: string;
  public roleId!: number;
}

User.init(
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
      validate: {
        notEmpty: {
          msg: 'Name cannot be empty',
        },
        notNull: {
          msg: 'Name type cannot be null',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email cannot be empty',
        },
        notNull: {
          msg: 'Email cannot be null',
        },
        isEmail: {
          msg: 'Please enter a valid email',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty',
        },
        notNull: {
          msg: 'Password cannot be null',
        },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Phone number cannot be empty',
        },
        notNull: {
          msg: 'Phone number cannot be null',
        },
      },
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Profile image cannot be empty',
        },
        notNull: {
          msg: 'Profile image cannot be null',
        },
        isURL: {
          msg: 'Please enter a valid URL for profile image',
        },
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Roles",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);

// Define associations in a separate function
export const associateUser = (models: any) => {
  User.belongsTo(models.Role, {
    foreignKey: 'roleId',
    as: 'role',
  });
};

export default User;