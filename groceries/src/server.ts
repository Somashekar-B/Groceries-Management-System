import { app } from "./index";
import { sequelize } from "./config/dbconfig";


const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    app.listen(PORT, async () => {
        console.log(`Server is running on PORT ${PORT}`);
        try {
            await sequelize.authenticate();
            console.log("Database Connection SuccessFull");
        } catch (error) {
            console.log('Unable to connect to Database : ', error);
        }
    })
}).catch(error => {
    console.log(error)
})