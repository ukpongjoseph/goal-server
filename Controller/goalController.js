const Goals = require("../Model/goalModel") 


// a. create a goal
const createGoal = async (req, res) => {
    const {userId} = req.user
    req.body.createdby = userId
    try {
        const goal = await Goals.create(req.body)
        res.status(201).json({success: true, goal})
    } catch (error) {
        res.status(500).json({error})
    }
}
// b. get all goals
const getGoals = async (req, res) => {
// res.send("all goals")
    const {userId} = req.user
    try {
        const goals = await Goals.find({createdby: userId})
        res.status(200).json({success: true, goals})
    } catch (error) {
        res.status(500).json({error})
    }
}
// c. update a goal
const updateGoal = async (req, res) => {
// res.send("updated goals")
    const {goalId} = req.params
    const {userId} = req.user
    try {
        const goal = await Goals.findOneAndUpdate(
            {createdby: userId, _id: goalId},
            req.body,
            {new: true},
            {runValidators: true}
        )
        res.status(200).json({success: true, goal})
    } catch (error) {
        res.status(500).json({error})
    }
}
// d. delete a goal
const deleteGoal = async (req, res) => {
// res.send("deleted goal")
    const {goalId} = req.params
    const {userId} = req.user
    try {
        const goal = await Goals.findOneAndDelete({createdby: userId, _id: goalId})
        res.status(200).json({success: true, goal})
    } catch (error) {
        res.status(500).json({error})
    }
}
// d. get a single goal
const getSingleGoal = async (req, res) => {
// res.send("single goal")
    const {goalId} = req.params
    const {userId} = req.user
    try {
        const goal = await Goals.findOne({createdby: userId, _id: goalId})
        res.status(200).json({success: true, goal})
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = {createGoal, getGoals, updateGoal, deleteGoal, getSingleGoal}