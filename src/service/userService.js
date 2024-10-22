import Users from "../model/User.js";

class UserService {
  // Create a new user
  static async createUser(userData) {
    return await Users.create({ ...userData, status: "active" });
  }

  // Get all users
  static async getAllUsers() {
    return await Users.findAll({
      where: { status: 'active' },
    });
  }

  // Get a single user by ID
  static async getUserById(id) {
    return await Users.findOne({
      where: {
        id,
        status: 'active',
      },
    });
  }

  // Update a user by ID
  static async updateUser(id, userData) {
    const user = await Users.findByPk(id);
    if (!user) throw new Error("User not found");
    return await user.update(userData);
  }

  // Delete a user by ID (soft delete by setting a status to 'inactive')
  static async deleteUser(id) {
    const user = await Users.findByPk(id);
    if (!user) throw new Error("User not found");
    return await user.update({ status: "inactive" });
  }

  // Get a user by username and email
  static async getUserByUsernameAndEmail(username, email) {
    return await Users.findOne({
      where: {
        username,
        email,
        status: 'active',
      },
    });
  }
}

export default UserService;
