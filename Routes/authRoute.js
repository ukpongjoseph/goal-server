const router = require("express").Router()
const {register, login, getAllUsers} = require("../Controller/auth")

router.post('/register', register)
router.post('/login', login)
router.get('/register/users', getAllUsers)

module.exports = router