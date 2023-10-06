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