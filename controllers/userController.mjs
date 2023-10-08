// bring in prisma and cookie

import prisma from "../prisma/index.mjs"
import cookieToken from "../utils/cookieToken.mjs"

export const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        // validation
        if (!name || !email || !password) {
            throw new Error("Please provide all fields");
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
            }
        });

        // Send user a token
        cookieToken(user, res)
    } catch (error) {
        throw new Error("error", error)
    }
}

export const login = async (req, res, next) => {
    try {
        // take info from user
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Please provide email and password");
        }

        // find user from db and login 
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        });

        // When user is exist

        if (!user) {
            throw new Error("User not found")
        }

        // password validation

        if (user.password !== password) {
            throw new Error("Incorrect password")
        }

        // login user
        cookieToken(user, res);
    } catch (error) {
        throw new Error("error", error)
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({
            success: true
        })
    } catch (error) {
        throw new Error("Error", error)
    }
}