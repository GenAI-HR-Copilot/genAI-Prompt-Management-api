import UserService from '../service/userService.js';
import ResponseHandler from "../utils/responseHandler.js";


class UserController {
  // Create a new user
  static async createUser(req, res) {
    const { username, email, role } = req.body;

    const userData = {
      username,
      email,
      role: role || 'user',
    };

    try {
      const data = await UserService.createUser(userData);
      await ResponseHandler.handelServerDataCreated(res, data);
    } catch (error) {
      console.error('Error creating user:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  // Get all users
  static async getAllUsers(req, res) {
    try {
      const data = await UserService.getAllUsers();
      if (data && data.length > 0) {
        await ResponseHandler.handelServerDataGet(res, data);
      } else {
        await ResponseHandler.handelDataNotFound(res);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  // Get a single user by ID
  static async getUserById(req, res) {
    const { id } = req.params;
    try {
      const data = await UserService.getUserById(id);
      if (data) {
        await ResponseHandler.handelServerDataGet(res, data);
      } else {
        await ResponseHandler.handelDataNotFound(res);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  // Update a user by ID
  static async updateUser(req, res) {
    const { id } = req.params;
    const { username, email, role, status } = req.body;

    const userData = {
      username,
      email,
      role,
      status: status || 'active',
    };

    try {
      const data = await UserService.updateUser(id, userData);
      await ResponseHandler.handelServerDataGet(res, data);
    } catch (error) {
      console.error('Error updating user:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  // Delete a user by ID (soft delete by making status inactive)
  static async deleteUser(req, res) {
    const { id } = req.params;
    try {
      await UserService.deleteUser(id);
      await ResponseHandler.handelServerDataGet(res, { message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  // Login
  static async loginUser(req, res) {
    const { username, email } = req.body;

    try {
      // Find user by username and email
      const user = await UserService.getUserByUsernameAndEmail(username, email);

      if (user) {
        // Example response, adapt as needed
        await ResponseHandler.handelServerDataGet(res, {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          status: user.status,
        });
      } else {
        await ResponseHandler.handelDataNotFound(res);
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }
}

export default UserController;
