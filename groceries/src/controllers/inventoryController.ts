import { Groceries } from "../models/Groceries";
import { Request, Response } from "express";
import { sequelize } from "../config/dbconfig";
import { QueryTypes, col, fn } from "sequelize";

interface Item {
    id: number,
    name: string,
    price: number,
    quantity: number
}

interface OrderReq {
    id: number,
    quantity: number
}


const getAllGroceries = async (req: Request, res: Response) => {
    try {
        const groceries = await sequelize.query("SELECT id, name, quantity, price FROM groceries_stocks", {
            type: QueryTypes.SELECT
        });
        res.json(groceries);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            result: "failure",
            error: "Internal Server Error"
        })
    }
};

const addGrocery = async (req: Request, res: Response) => {
    try{
        const body = req.body;
        const itemName: string = body.name
        const itemQty: number = body.quantity;
        const itemPrice: number = body.price;
        if ((await getItemWithName(itemName)).length == 0){
            await sequelize.query("INSERT INTO groceries_stocks(name, quantity, price) VALUES (?, ?, ?)", {
                replacements: [itemName, itemQty, itemPrice],
                type: QueryTypes.INSERT
            });
            res.status(201).json({
                result: "success",
                message: "Item Added Successfully"
            })
        }
        else{
            res.status(403).json({
                result: "failure",
                message: "Item already exist, Please use update Item"
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).json({
            result: "failure",
            error: "Internal Server Error"
        })
    }
}

const updateGrocery = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const itemId: number = body.id
        const itemName: string = body.name
        const itemQty: number = body.quantity;
        const itemPrice: number = body.price;
        const itemExist = await sequelize.query("SELECT * FROM groceries_stocks WHERE id = ?", {
            replacements: [itemId],
            type: QueryTypes.SELECT
        });
        if (itemExist.length == 0) {
            res.status(404).json({
                result: "failure",
                message: "Item with id not found"
            })
        }
        else {
            const existItem: Item[] = await getItemWithName(itemName);
            var isValid: boolean = false;
            if(existItem.length > 0){
                if(existItem[0].id == itemId){
                    isValid = true;
                }
            }else{
                isValid = true;
            }

            if (isValid){
                await sequelize.query("UPDATE groceries_stocks SET name  = ?, quantity = ?, price = ? WHERE id = ?", {
                    replacements: [itemName, itemQty, itemPrice, itemId],
                    type: QueryTypes.UPDATE
                });
                res.status(200).json({
                    result: "success",
                    message: "Item Updated Successfully"
                })
            }else{
                res.status(403).json({
                    result: "failure",
                    message: "Item with same name already exist, Please cross check "
                })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            result: "failure",
            error: "Internal Server Error"
        })
    }
}

const removeGrocery = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const itemId: number = body.id
        const itemExist = await sequelize.query("SELECT * FROM groceries_stocks WHERE id = ?", {
            replacements: [itemId],
            type: QueryTypes.SELECT
        });
        if (itemExist.length == 0) {
            res.status(404).json({
                result: "failure",
                message: "Item with id not found"
            })
        }
        else {
            await sequelize.query("DELETE FROM groceries_stocks WHERE id = ?", {
                replacements: [itemId],
                type: QueryTypes.DELETE
            });
            res.status(200).json({
                result: "success",
                message: "Item Deleted Successfully"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            result: "failure",
            error: "Internal Server Error"
        })
    }
}

const updateQuantity = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const itemId: number = body.id
        const itemName: string = body.name
        const itemQty: number = body.quantity;
        const itemPrice: number = body.price;
        const existItems = await sequelize.query("SELECT * FROM groceries_stocks WHERE id = ?", {
            replacements: [itemId],
            type: QueryTypes.SELECT
        }) as Item[];
        if (existItems.length == 0) {
            res.status(404).json({
                result: "failure",
                message: "Item with id not found"
            })
        }
        else {
            await sequelize.query("UPDATE groceries_stocks SET quantity = ? WHERE id = ?", {
                replacements: [itemQty + existItems[0].quantity, itemId],
                type: QueryTypes.UPDATE
            });
            res.status(200).json({
                result: "success",
                message: "Item Updated Successfully"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            result: "failure",
            error: "Internal Server Error"
        })
    }
}


const orderItems = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        if (await validateItems(body)){
            res.json({
                result: "success",
                orderid: Math.floor(Math.random() * Date.now()), 
                message: "Order SuccessFul"
            })
        }else{
            res.status(403).json({
                result: "failure",
                message: "Inssuficient Items in stock"
            })
        }
    } catch (error) {
        
    }
}

async function validateItems(items: OrderReq[]){
    for(var i=0; i< items.length; i++){
        const dbData = await Groceries.findOne({
            where: {
                id: items[i].id
            }
        });

        if (dbData) {
            const finalQuantity = parseInt(String(dbData.get('quantity'))) - items[i].quantity;
            if (finalQuantity < 0) {
                return false;
            } else {
                const newData = {
                    quantity: finalQuantity
                }
                await Groceries.update(newData, {
                    where: {
                        id: items[i].id
                    }
                });
            }
        } 
    }
    return true;
}



async function getItemWithName(itemName: string) {
    const itemExist = await sequelize.query("SELECT * FROM groceries_stocks WHERE LOWER(name) = LOWER(?)", {
        replacements: [itemName],
        type: QueryTypes.SELECT
    }) as Item[];
    return itemExist
}
 
export { getAllGroceries, addGrocery, updateGrocery, removeGrocery, updateQuantity, orderItems};
