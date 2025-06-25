const express = require("express")
const Auth = require("../Model/auth")
const customError = require('../Utils/handleError')

const register = async (req, res) => {
    const {name, email, password} = req.body
    const userEmail = await Auth.findOne({email})
    const userName = await Auth.findOne({name})
    if(userEmail && userName){
        return res.status(400).json({msg: "Name and Email has already been registered"})
    }
    if(userEmail){ 
        return res.status(400).json({msg: "Email has already been registered"})
    }
    if(userName){
        return res.status(400).json({msg: "Name has already been registered, use another name"})
    }
    try {
        const data = await Auth.create(req.body)
        res.status(201).json({msg: "successful", data})
    } catch (error) {
        res.status(500).json({error})
        // const errors = customError(error)
        // res.status(400).json({errors})
    }
}

const login = async (req, res) => {
    const {email, password} = req.body 
    if(!email || !password){
        return res.status(400).json({msg: "Please provide your Login details"})
    }
    try {
        const userData = await Auth.findOne({email})
        if(!userData){
            throw Error("Incorrect email")
        }
        const isLoggedIn = await userData.comparePassword(password)
        if(!isLoggedIn){
            throw Error("Incorrect password")
        }
        const token = userData.generateToken()
        // console.log(token)
        res.status(200).json({
            success: true,
            user: {name: userData.name, userId: userData._id},
            token
        })
    } catch (error) {
        res.status(500).json({error})
        // const errors = customError(error)
        // res.status(400).json({errors})
    }
}
const getAllUsers = async (req, res) => {
    try {
        const users = await Auth.find({})
        res.status(200).json({success: true, users})
    } catch (error) {
        res.status(500).json({msg: "server error"})
      
    }
}


module.exports = {register, login, getAllUsers}