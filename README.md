# Storefront Backend Project

## Terminal commands
- to start project use: npm start
- to run unit tests use: npm test
- to install packages use: npm install

## create user, databases, migrations
connect to the default postgres database as the server's root user psql -U postgres

- create user: CREATE USER owner_user WITH PASSWORD 'password123';
-creat databases:
CREATE DATABASE store_db;
CREATE DATABASE store_test_db;
-grant privileges:
\c store_db
GRANT ALL PRIVILEGES ON DATABASE store_db TO owner_user;
GRANT USAGE, CREATE ON SCHEMA public TO owner_user;
----------------------------------------------

\c store_test_db
GRANT ALL PRIVILEGES ON DATABASE store_db TO owner_user;
GRANT USAGE, CREATE ON SCHEMA public TO owner_user;

### migrations
Navigate to the root directory and run the command: db-migrate up

## dotenv file
![image](https://user-images.githubusercontent.com/95032871/213775837-f2c27306-2cb7-494c-9550-0bd8fa6d80c6.png)

