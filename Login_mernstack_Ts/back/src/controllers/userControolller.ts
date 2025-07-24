import { Request, Response } from "express";
import User, { IUser } from "../models/userModels";

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body as { name: string, email: string, password: string }
        const user = await User.create({
            name,
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

