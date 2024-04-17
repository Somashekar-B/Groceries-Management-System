import express from "express";
import { getAllUSers, addUser, userLogin, updatePassword } from "../controllers/usersController";


const router = express.Router();

// curl --location 'http://localhost:3000/user'
router.get('/', getAllUSers);

// curl --location --request POST 'http://localhost:3000/user/signup' \
// --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNvbWFzaGVrYTIyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzEzMjk5NDc0fQ.EfqGPQ5gm9Lv1U921cFQIrG1xgF5HPzW473pTzKwYgk' \
// --header 'Content-Type: application/json' \
// --data '{
// "username": "somashekar.b",
// "userType": "admin",
// "password": "default"
// }'
router.post('/signup', addUser);


// curl --location --request POST 'http://localhost:3000/user/login' \
// --header 'Content-Type: application/json' \
// --data '{
// "username": "somashekar.b",
//     "password": "default"
// }'
router.post('/login', userLogin);

// curl --location --request PUT 'http://localhost:3000/user/password' \
// --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNvbWFzaGVrYXIuYiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMzI5NDk3OH0.6KUVAJ7CdE4xK1PhXRraCzxOYkC-jYeywr3m40zLytI' \
// --header 'Content-Type: application/json' \
// --data '{
// "username": "somasheka22",
// "currentPassword": "default",
// "newPassword": "password"
// }'
router.put('/password', updatePassword);

export { router as userRoutes}