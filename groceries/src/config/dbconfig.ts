import { Sequelize } from "sequelize";

const sequelize = new Sequelize("groceries", "root", "root", {
    host: 'localhost', 
    dialect: 'mysql'
})

export { sequelize };


