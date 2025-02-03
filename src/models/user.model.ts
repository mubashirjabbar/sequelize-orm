'use strict';
import { DataTypes } from 'sequelize';

import sequelize from '../config/database';


// Define the TypeScript interface for User
export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  profileImage: string;
}

const User = sequelize.define(
  'users',
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
          msg: 'password cannot be null',
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

  },
);

export default User;