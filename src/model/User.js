import { DataTypes } from 'sequelize';
import sequelize from '../repository/db.js';
const roleEnum = ["user", "editor", "approver", "admin"];
const statusEnum = ["active", "inactive"]; // Define status values

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM(roleEnum),
      allowNull: false,
      defaultValue: "user", // Default role is 'user'
    },
    status: {
      type: DataTypes.ENUM(statusEnum),
      allowNull: false,
      defaultValue: "active", // Default status is 'active'
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Users",
    timestamps: false, // No updated_at column
    createdAt: "created_at",
  }
);

export default Users;
