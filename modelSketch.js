/*

E-Commerce API Data Model




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