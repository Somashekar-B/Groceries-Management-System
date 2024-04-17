import express, { NextFunction, Router } from 'express';
import { addGrocery, getAllGroceries, orderItems, removeGrocery, updateGrocery, updateQuantity } from '../controllers/inventoryController';
import { isAdmin } from '../config/middleWare';

const router = express.Router();

// curl --location 'http://localhost:3000/inventory'
router.get("/", getAllGroceries);

// curl --location --request POST  'http://localhost:3000/inventory' \
// --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNvbWFzaGVrYTIyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzEzMjk5NDc0fQ.EfqGPQ5gm9Lv1U921cFQIrG1xgF5HPzW473pTzKwYgk' \
// --header 'Content-Type: application/json' \
// --data '{
//     "name":"Mango",
//     "quantity": 11,
//     "price":100.5
// }'
router.post("/",isAdmin, addGrocery);


// curl --location --request PUT 'http://localhost:3000/inventory' \
// --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNvbWFzaGVrYTIyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzEzMjk5NDc0fQ.EfqGPQ5gm9Lv1U921cFQIrG1xgF5HPzW473pTzKwYgk' \
// --header 'Content-Type: application/json' \
// --data '{
//         "id": 1,
//         "name": "Mango Pickle",
//         "quantity": 34,
//         "price": 100.5
// }'
router.put("/", isAdmin, updateGrocery);


// curl --location --request PUT 'http://localhost:3000/inventory/quantity' \
// --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNvbWFzaGVrYTIyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzEzMjk5NDc0fQ.EfqGPQ5gm9Lv1U921cFQIrG1xgF5HPzW473pTzKwYgk' \
// --header 'Content-Type: application/json' \
// --data '{
//     "id": 2,
//     "quantity": 10
// }'
router.put("/quantity", isAdmin, updateQuantity);

// curl --location --request DELETE 'http://localhost:3000/inventory' \
// --header 'Content-Type: application/json' \
// --data '{
//     "id": 1
// }'
router.delete("/", isAdmin, removeGrocery);


// curl --location --request POST 'http://localhost:3000/inventory/order' \
// --header 'Content-Type: application/json' \
// --data '[
//     {
//         "id":2,
//         "quantity": 10
//     },
//     {
//         "id":6,
//         "quantity": 0
//     }
// ]'
router.post("/order", orderItems);

export { router as InventoryRoutes}