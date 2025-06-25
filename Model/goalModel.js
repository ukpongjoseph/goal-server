const express = require("express")
const mongoose = require("mongoose")

const schemaConstructor = mongoose.Schema
const goalSchema = new schemaConstructor({
    title: {
        type: String,
        required: [true, "Please provide a title for your goal"]
    },
    description: {
        type: String,
        required: [true, "Please provide a description for your goal"]
    },
    state: {
        type: String,
        required: true,
        enum: ["achieved", "in progress"]
    },
    dueDate: {
        type: Date,
    },
    createdby: {
        type: mongoose.Types.ObjectId,
        ref: "Auth",
        required: [true, "please provide the owner of the goal"]
    }
}, {timestamps: true})

module.exports = mongoose.model("personalGoals", goalSchema)