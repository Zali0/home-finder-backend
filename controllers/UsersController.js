import User from '../models/Users.js';
import bcrypt from 'bcryptjs'

export const create = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const {email} = newUser;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(User({password}), salt)

        const newUserData = new User({name, email, password: hashedPassword, role});
       

        const savedUser = await newUserData.save();
        res.status(200).json({ message: 'User created successfully', user: savedUser });
    }
       
     catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const userData = await User.find();
        if (!userData || userData.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const userExist = await User.findById(userId);
        if (!userExist) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(userExist);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
}

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Delete and return the user in one step
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};






