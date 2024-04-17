import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/dbconfig";

class Groceries extends Model { }

Groceries.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },

    price: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'groceries_stocks'
});

export { Groceries };