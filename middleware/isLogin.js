import prisma from "../prisma/index.mjs";
import jwt from "jsonwebtoken"

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookie.token;

        if (!token) {
            res.send("Please login");
            throw new Error("Error", error);
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await prisma.user.findUnique({
            where: {
                id: decodedToken.userId,
            }
        });

        next();
    } catch (error) {
        throw new Error("Error", error);
    }
}