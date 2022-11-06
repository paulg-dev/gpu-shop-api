/*

E-Commerce API Data Model


Description:
	- An e-commerce API that have the functions of an online shop.
	- Allows users to register, 'add to cart' products and create an order.
	- Allows admins to create and update products, manage user info and retrieve all orders.


Features:
1. User Registration
	- Will not allow multiple registration for same user (same email address) -done!
	- Email address entries will automatically be converted to lowercase -done!
	- Non capitalized name entries will automatically be saved in the database with first letter as capitalized
	- Will return new user info with encrypted password after registration successful -done!
	- Will show appropriate errors 
		a. If required field/s  is/are not supplied
		b. If email format is incorrect

2. User Login (User authentication)
	- Will return an access token to be used for authentication -done!
	- Will show appropriate errors
		a. If provided email address is not registered
		b. If password is wrong

3. Admin/s will be able to set other users to admin level. -done!
	- Will show appropriate errors
		a. If the one changing the user level is not an admin
		b. If user to update is not found -done!
		c. If user to update is already an admin -done!


4. Admin will be able to create products

5. Will be able to retrieve all active products




3-Model Structure

User
firstName - string,
lastName - string,
email - string,
password - string,
mobileNo - string,
isAdmin - boolean,
	      default: false


Product
name - string,
description - string,
price - number
isActive - boolean
		   default: true,
createdOn - date
			default: new Date()
orders - [
	{
		orderId - string,
		quantity - number

	}
]


Order
userId - string
totalAmount - number,
purchasedOn - date
		     default: new Date(),
products - [

	{
		productId - string,
		quantity - number
	}

]





2-Model Structure

User
firstName - string,
lastName - string,
email - string,
password - string,
mobileNo - string,
isAdmin - boolean,
	      default: false
orders: [
	
	{
		totalAmount - number,
		purchasedOn - date
				     default: new Date(),
		products - [

			{
				productId - string,
				quantity - number
			}

		]
	}

]

Product
name - string,
description - string,
price - number
isActive - boolean
		   default: true,
createdOn - date
			default: new Date()
orders: [
	
	{	
		orderId - string,
		userId - string,
		quantity - number,
		purchasedOn - date
				     default: new Date(),
	}

]






*/