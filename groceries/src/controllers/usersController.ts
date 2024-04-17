import { Request, Response } from "express";
import { User } from "../models/Users";
import { Groceries } from "../models/Groceries";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface TokenData{
    username: string
    role: string
}


const JWT_SECRET = "GROCERIES_SECRET";



const getAllUSers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
};

async function isUserExist(uname: String) {
    try {
        const user = await User.findAll({
            where: {
                "username": uname
            }
        });
        return user.length > 0;
    } catch (error) {
        console.log(error)
        return true;
    }
}

const addUser = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const headers = req.headers;
        if (! await isUserExist(body.username)) {
            const hashedPassword = await bcrypt.hash(body.password, 10);
            const newUser = {
                username: body.username,
                userType: body.userType,
                password: hashedPassword
            }

            var isValid: boolean = false;
            
            if (newUser.userType.toLowerCase() == 'admin'){
                const Auth = headers.authorization;
                if(Auth) {
                    const token = Auth.split(" ")[1];
                    try {
                        var tokenData = jwt.verify(token, JWT_SECRET) as TokenData;
                        if (tokenData.role.toLowerCase() == 'admin') {
                            isValid = true;
                        }
                    } catch (error) {

                    }
                }
            }else{
                isValid = true
            }
            
            if(isValid){
                await User.create(newUser);
                res.json({
                    result: "success",
                    message: "User Created Successfully"
                })
            }else{
                res.json({
                    result: "success",
                    message: "Cannot Create Admin Account"
                })
            }
        }else{
            res.json({
                result: "failure",
                message: "Username Already Exists. Please choose other one"
            });
        }
            
    } catch (error) {
        console.log(error);
        res.status(500).json({
             result: "failure",
             error: "Internal Server Error"
        })
    }
}

const userLogin = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const username = body.username;
        const password = body.password;

        const user = await User.findOne({
            where: {
                username: username
            }
        });

        if (user != null) {
            const dbPassword = String(user.get('password'));
            const passwordMatch = await bcrypt.compare(password, dbPassword)
            if (passwordMatch) {
                const payload = {
                    username: body.username,
                    role: user.get('userType')
                }
                res.json({
                    result: "success",
                    token: jwt.sign(payload, JWT_SECRET)
                })
            }
            else{
                res.json({
                    result: "failure",
                    message: "Password is incorrect"
                })
            }
        }

        else{
            res.status(404).json({
                res: "failure",
                message: "User Not Found"
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            result: "failure",
            error: "Internal Server Error"
        })
    }
}

const updatePassword = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const username = body.username;
        const currentPassword = body.currentPassword;
        if(await isUserExist(username)){
            const user = await User.findOne({
                where: {
                    username: username
                }
            });
            const dbpass: string = String(user?.get('password'));
            if (await bcrypt.compare(currentPassword, dbpass)){
                const newPassword = body.newPassword;
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                const newData = {
                    password: hashedPassword
                }
                User.update(newData, {
                    where: {
                        username: username
                    }
                });
                res.status(200).json({
                    res: "success",
                    message: "Password Updated Successfully"
                });
            }else{
                res.status(403).json({
                    res: "failure",
                    message: "Username and Current Password Doesn't Match"
                });
            }
        }else{
            res.status(403).json({
                res: "failure",
                message: "Username and Current Password Doesn't Match"
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            result: "failure",
            error: "Internal Server Error"
        })
    }
}



export { getAllUSers, addUser, userLogin, updatePassword };
