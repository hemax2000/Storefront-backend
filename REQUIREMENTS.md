# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- show all products
- find products by id
- creat product
- update product
- delete product

#### Users
- create user
- show all users
- update user
- delete user

#### Orders
- show all orders
- show all completed orders
- find order by id
- update order status
- delete order
- add product to order
- create order

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

schema:

![image](https://user-images.githubusercontent.com/95032871/213930491-93c38ca9-9e4a-412f-951d-fbd4d7306c5e.png)


#### User
- id
- firstName
- lastName
- password

schema:

![image](https://user-images.githubusercontent.com/95032871/213930513-78b66479-4817-4eab-8903-7280504bc9c9.png)


#### Orders
- id
- user_id
- status of order (active or complete)

schema:

![image](https://user-images.githubusercontent.com/95032871/213930530-e799c4e7-8f1c-4a63-8e7d-03dc9f751f81.png)


#### Order-Products
- id
- product_id
- order_id
- quantity 

schema:

![image](https://user-images.githubusercontent.com/95032871/213930564-5721655c-6414-48fa-ab53-6446bfa8627a.png)

