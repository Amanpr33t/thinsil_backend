require('express-async-errors')
const { StatusCodes } = require('http-status-codes')
const User = require('../models/user')
const CustomAPIError = require('../errors/custom-error')

//This function is used to add a product to the cart
const addItemToCart = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(200).json({ status: 'noUser', msg: 'No user exists' })
        }
        const updatedCartItems = [...user.cartItems, req.body.productId]
        await User.findOneAndUpdate(
            { email: req.body.email },
            { cartItems: updatedCartItems },
            { new: true, runValidators: true })
        return res.status(200).json({ status: 'ok', msg: 'Cart item has been added' })
    } catch (error) {
        next(error)
    }

}

//This function is used to remove an item from the cart
const removeItemFromCart = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(200).json({ status: 'noUser', msg: 'No user exists' })
        }
        const updatedCartItems = user.cartItems.filter(function (item) {
            return item !== req.body.productId
        })
        await User.findOneAndUpdate(
            { email: req.body.email },
            { cartItems: updatedCartItems },
            { new: true, runValidators: true })
        return res.status(200).json({ status: 'ok', msg: 'Cart item has been removed' })
    } catch (error) {
        next(error)
    }
}

//This function is used to get all the cart items
const getCartItems = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email })
        if (!user) {
            return res.status(200).json({ status: 'noUser', msg: 'No user exists' })
        }
        return res.status(200).json({ status: 'ok', cartItems: user.cartItems })
    } catch (error) {
        next(error)
    }
}

//This function is used to determine if the product is present in the cart
const isProductPresentInCart = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.query.email })
        if (!user) {
            return res.status(200).json({ status: 'noUser', msg: 'No user exists' })
        }
        const productIdExists = await user.cartItems.find((id) => id.toString() === req.query.productId);
        if(productIdExists){
            return res.status(200).json({ status: 'exists', message:'product already present to the cart' })
        }
        return res.status(200).json({ status: 'notExists', message:'product not present to the cart' })
       
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addItemToCart, removeItemFromCart, getCartItems, isProductPresentInCart
}