// const User = require("../models/UserModel.js");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    const updatedData = {
      name,
      email,
    };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedData,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.deleteAllUsers = async (req, res) => {
  try {
    await prisma.user.deleteMany();
    res.status(200).json({ message: 'All users deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Public Routes
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    const token = jwt.sign({ id: user.id }, jwt_secret, { expiresIn: "1h" });

    console.log('Token: ', token);
    res.status(201).json({ message: 'User created successfully', token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log('user not found');
      return res.status(400).json({ error: 'User not found  ' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('Invalid Password');
      return res.status(400).json({ error: 'Invalid Password' });
    }

    
    console.log('Login successful:', user);
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
