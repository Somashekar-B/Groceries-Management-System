# Groceries Management System

This project is a TypeScript-based application for managing groceries stocks and user authentication.

## Setup 1: Local Development

1. **Download Code**: Clone this repository to your local machine using `git clone <repository-url>`.

2. **Setup Node.js**: Ensure you have Node.js installed on your machine. You can download it from [here](https://nodejs.org/).

3. **Install TypeScript**: Run `npm install -g typescript` to install TypeScript globally.

4. **Install Dependencies**: Navigate to the project directory and run `npm install` to install all project dependencies.

5. **Database Setup**: Create a MySQL database named `groceries`.

6. **Create Tables**:
    ```sql
    CREATE TABLE `groceries_stocks` (
      `id` int NOT NULL AUTO_INCREMENT,
      `name` varchar(255) NOT NULL,
      `quantity` int NOT NULL DEFAULT '0',
      `price` float NOT NULL DEFAULT '0',
      `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

    CREATE TABLE `users` (
      `id` int NOT NULL AUTO_INCREMENT,
      `username` varchar(200) NOT NULL,
      `usertype` varchar(100) NOT NULL,
      `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      `password` varchar(250) NOT NULL,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    ```

7. **Compile TypeScript**: Run `tsc` command in the terminal to compile TypeScript files.

8. **Navigate to Dist Directory**: Run `cd ./dist` to navigate to the compiled files directory.

9. **Start Application**: Run `node server.js` to start the application.

### Setup 2: Docker Container

1. **Start a MySQL Container**: Start a MySQL container in Docker with the following command:
```bash
docker run mysql

3. **Setup Database and Tables**: Follow steps 5 and 6 from Local Development Setup to create the `groceries` database and tables.

4. **Navigate to Project Repository**: Navigate to the project repository in your machine.

5. **Build Application in Docker**: Build the application in Docker with the following command:
```bash
docker build -t groceries:latest .

6. **Run Docker Image**: Run the Docker image with the following command:
```bash
docker run -it -p 3000 groceries:latest



## Using Functionalities
**please find curls to use the functionalities in the respected routes.ts files**

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

