const express = require('express')
const router = express.Router()
const { addItemToCart, removeItemFromCart, getCartItems, isProductPresentInCart} = require('../controllers/cart')

router.patch('/add', addItemToCart) //This route is used to add an item to cart
router.patch('/remove', removeItemFromCart) //This route is used to remove an item from the cart
router.get('/getCartItems/:email', getCartItems) //This route is used to get all the cart item for a particular user email
router.get('/isProductPresentInCart', isProductPresentInCart) //This route is used to check if a product is present in the cart

module.exports = router