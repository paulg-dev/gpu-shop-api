

## Project Name: Santos E-Commerce API

### Hosted API Products Link:
* [E-Commerce-API Products](https://e-commerce-api-santos.onrender.com/products)

### User Credentials:

#### `Regular User`
*   email: "user@mail.com"
*   password: "user1234"

#### `Admin User`
*   email: "admin@mail.com"
*   password: "admin1234"


### Features Overview:

#### `A. For Admin User`
*   [x] Set user as admin
	*   [x] User not found error return
	*   [x] User is already admin error return
*   [x] Create Product
	*   [x] Display product details upon successful registration
	*   [x] Product already registered error return
	*   [x] Empty required fields error return
	*   [ ] Enable multiple product creation
*   [x] Update Product information
	*   [ ] Automatically update product info of items already in user's carts
*   [x] Archive Product
*   [x] Make Product Available
*   [x] Retrieve all orders

#### `B. For Regular User`
*   [x] User registration
	*   [ ] Empty required fields error return
	*   [x] Duplicate email checking
	*   [x] Email auto lower case
	*   [ ] Email format validation
	*   [ ] Name auto capitalization
	*   [ ] Name format validation
*   [x] User authentication
	*   [x] Display access token
	*   [ ] Empty required fields error return
	*   [x] Email not registered error return
	*   [x] Wrong password error return
*   [x] Retrieve all products
*   [x] Retrieve all active products
*   [x] Retrieve a single product
	*   [ ] Enable product search using product name
*   [x] Non-admin User checkout (Create Order)
*   [x] Retrieve authenticated user’s orders
*   [x] Retrieve User Details 

#### `C. Cart Features`
*   [x] Add to Cart
	*   [x] Limit quantity to available stocks
*   [x] View Added Products
*   [x] Change product quantities
	*   [ ] Execute remove from cart if quantity is set to zero
	*   [ ] Limit changing of quantity to available stocks
*   [ ] Remove products from cart 
*   [x] Subtotal for each item
*   [x] Total price for all items
	*   [ ] Declare and Save totalAmount in database


### Tools Used

* [Sublime Text](https://www.sublimetext.com/)
* [Postman](https://www.postman.com/)
* [MongoDB](https://www.mongodb.com/)


### Acknowledgements
* [Zuitt Learning Institute](https://zuitt.co/)
* [README Template](https://gitlab.com/kopino4-templates/readme-template)