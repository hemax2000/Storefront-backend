# Storefront Backend Project

## Terminal commands
- to start project use: npm start
- to run unit tests use: npm test
- to install packages use: npm install

## create user, databases, migrations
connect to the default postgres database as the server's root user psql -U postgres

create user: CREATE USER owner_user WITH PASSWORD 'password123';

creat databases:

- CREATE DATABASE store_db;

- CREATE DATABASE store_test_db;

grant privileges:
- \c store_db

- GRANT ALL PRIVILEGES ON DATABASE store_db TO owner_user;

- GRANT USAGE, CREATE ON SCHEMA public TO owner_user;

----------------------------------------------

- \c store_test_db;

- GRANT ALL PRIVILEGES ON DATABASE store_db TO owner_user;

- GRANT USAGE, CREATE ON SCHEMA public TO owner_user;

### migrations
Navigate to the root directory and run the command: 

- db-migrate up

## dotenv file
![image](https://user-images.githubusercontent.com/95032871/213775837-f2c27306-2cb7-494c-9550-0bd8fa6d80c6.png)

## Authorization

tokens are passed like this:

Authorization =>  Bearer TOKEN

## URLS
- create user: [post] http://localhost:3000/users 

body: {
    "firstname":"ibrahim",
    "lastname":"othman",
    "password":"12345678"
}

- get all users: [get] http://localhost:3000/users

----------------------------------------------------

- create product: [post] http://localhost:3000/products

body: {
    "name":"iphone",
    "price":"22",
    "category":"phhone"
}

- get all products: [get] http://localhost:3000/products

- get product by id: [get] http://localhost:3000/products/1

- delete product: [delete] http://localhost:3000/products/1

-------------------------------------------------------------

- create order: [post] http://localhost:3000/orders

body: {
    "product_id":"2",
    "quantity":"2",
    "user_id":"1",
    "status":"active"
}

- mark order as complete: [put] http://localhost:3000/orders/1

body: {
    "status":"complete"
}

- get completed order bu user id: http://localhost:3000/orders/completed/1

- delete product: [delete] http://localhost:3000/orders/1
