import { IUser } from "../../client/src/types/interfaces";
import asyncHandler from "../middleware/asyncHandler";
import User from "../models/userModel";
import { AuthRequest,  } from '../types/types';
import generateToken from "../utils/generateToken";
import { Request } from "express";

// @desc   auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler<AuthRequest>(async(req,res)=>{
    const { email, password } = req.body;
    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id.toString());
        res.status(201).json({
            _id:user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc   Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler<AuthRequest>(async(req,res)=>{
    const { name, email, password } = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400); //client error
        throw new Error('User already exists');
    }
    const user = await User.create({
        name,
        email,
        password
    });
    if(user){
        generateToken(res, user._id.toString());
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin: user.isAdmin,
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    logout user & clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler<AuthRequest>(async(_req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler<AuthRequest>(async(req,res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        res.status(201).json({
            _id:user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }else{
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler<AuthRequest>(async(req,res)=>{
    const user = await User.findById(req.user.id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name:updatedUser.name, 
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
        });
    }else{
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc    Get users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler<AuthRequest>(async(req,res)=>{
    const users = await User.find({});
    res.status(200).json(users);
});

// @desc    Get user by ID
// @route   GET /api/users:id
// @access  Private/Admin
const getUserById = asyncHandler<AuthRequest>(async(req,res)=>{
    const user = await User.findById(req.params.id).select('-password');
    if(user){
        res.status(200).json(user);
    }else{
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc    delete users
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler<AuthRequest>(async(req,res)=>{
    const user = await User.findById(req.params.id);
    console.log(`user controller\nreq.params._id= ${req.params.id}`);
    if(user)
        console.log("user._id= ", user._id);
    else
        console.log("no user found");

    if(user){
        if(user.isAdmin){
            res.status(400);
            throw new Error("Cannot delete admin user");
        }
        await User.deleteOne({_id:user._id});
        res.status(200).json({message: 'User deleted successfully' });
    }else{
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    update user by id
// @route   PUT /api/users:id
// @access  Private/Admin
const updateUser = asyncHandler<AuthRequest>(async(req,res)=>{
    const user = await User.findById(req.params.id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin || user.isAdmin;
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    }
});


export{
    authUser, 
    registerUser,
    logoutUser,
    getUserProfile,
    updateProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
};