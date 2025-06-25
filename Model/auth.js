const mongoose = require("mongoose")
const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {isEmail} = require("validator")

const schemaConstructor = mongoose.Schema

const authSchema = new schemaConstructor({
    name: {
        type: String,
        required: [true, "Please provide your name"]
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail, "please provide a valid email"]
    },
    password: {
        type: String,
        required: true,
        minLength: [7, "the minimum password length is 7"]
    }
}, {timestamps: true})

authSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
authSchema.methods.comparePassword = async function(password){
    const isValid = await bcrypt.compare(password, this.password)
    return isValid
}
authSchema.methods.generateToken = function(){
   return jwt.sign({userId: this._id, name: this.name}, process.env.jwt_secret, {expiresIn : "1d"})
}

module.exports = mongoose.model("Auth", authSchema)