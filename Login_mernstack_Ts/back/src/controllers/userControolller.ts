import { Request, Response } from "express";
import User, { IUser } from "../models/userModels";


export const getUserAll = async (req: Request, res: Response) => {
    try {
        const users: IUser[] = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body as { username: string, email: string, password: string }
        const user = await User.create({
            username,
            email,
            password
        });

        if (!user) {
            return res.status(400).json({ message: "User creation failed" });
        }

        return res.status(201).json({ message: "User created successfully", user: user });
    } catch (error) {
        return res.status(500).json({ message: "Error creating user", error });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.find({ email, password });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        return res.status(500).json({ message: "Error logging in", error });
    }
}

export const deleteUserAll = async (req: Request, res: Response) => {
    try {
        const user = await User.deleteMany()

        if (!User) {
            res.status(400).json({ message: "Users not found" })
        }

        res.status(200).json({ message: "Users  deleted" })
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}