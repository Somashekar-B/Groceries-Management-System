import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';


interface TokenData {
    username: string
    role: string
}


const JWT_SECRET = "GROCERIES_SECRET";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const headers = req.headers;
    const Auth = headers.authorization;
    if (Auth) {
        const token = Auth.split(" ")[1];
        try {
            var tokenData = jwt.verify(token, JWT_SECRET) as TokenData;
            console.log("Toeknnn", tokenData)
            if (tokenData.role.toLowerCase() == 'admin') {
                next();
            }
        } catch (error) {
            res.status(401).json({
                result: "failure",
                message: "UnAuthorized"
            });
        }
    } else {
        res.status(401).json({
            result: "failure",
            message: "UnAuthorized"
        });
    }
}

export {isAdmin};