const router = require("express").Router()
const {createGoal, getGoals, getSingleGoal, updateGoal, deleteGoal} = require('../Controller/goalController')

router.route('/').post(createGoal).get(getGoals)
router.route('/:goalId').get(getSingleGoal).patch(updateGoal).delete(deleteGoal)






module.exports = router