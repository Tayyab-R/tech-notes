const User = require('../models/User')
const Note = require('../models/Note')
const asyncHanlder = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc    Get all users
// @route   GET /users
// @access  Private

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if(!users) {
        return res.status(400).json({message: 'No users found'})
    }

    res.json(users)
})

// @desc    Create new user
// @route   POST /users
// @access  Private

const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body

    // Confirm data
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({message: 'Please provide all required fields'})

    }

    // Check for duplicates
    const duplicate = await User.findOne({username}).lean().exec()
    if (duplicate) {
        return res.status(409).json({message : "Duplicate username"})

    }

    // Hash password
    const hashPwd = await bcrypt.hash(password, 10) // 10 is the salt
    const userObject = {username, 'password' : hashPwd, roles}

    // Create and store new user
    const user = await User.create(userObject)
    if (user){ //created
        res.status(201).json({message: 'New user ${username} created'})

    }
    else {
        res.status(400).json({message: 'Invalid user data received'})
    }
    
})

// @desc    UPdate a  user
// @route   PATCH /users
// @access  Private

const updateUser = asyncHandler(async (req, res) => {
    const {id, username, roles, active, password} = req.body

    // Confirm data
    if(!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({message: 'Please provide all required fields'})   
        
    }
    
    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(404).json({message: 'User not found'})
    }
})

// @desc    Delete all users
// @route   DELETE /users
// @access  Private

const deleteUser = asyncHandler(async (req, res) => {
    
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}