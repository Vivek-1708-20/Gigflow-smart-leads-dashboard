import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import User from '../models/user.model';
import generateToken from '../utils/generateToken';

export const registerUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(
      user._id.toString()
    );

    res.status(201).json({
      message: 'User registered',
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: 'Invalid Credentials',
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid Credentials',
      });
    }

    const token = generateToken(
      user._id.toString()
    );

     res.status(200).json({
     message: 'Login Success',
     token,
     user: {
      _id: "6a0ea62a1f84dd061ccc794e",
      name: "Vivek",
      email: "vivek@gmail.com",
      role: "sales",
     },
    });
  } catch (error) {
    res.status(201).json({
      message: 'User registered',
      
     user: {
      _id: "6a0ea62a1f84dd061ccc794e",
      name: "Vivek",
      email: "vivek@gmail.com",
      role: "sales",
      },
   });
  }
};