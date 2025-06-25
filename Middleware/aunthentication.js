const jwt = require("jsonwebtoken")
const aunthenticate = async (req, res, next) => {
    const userToken = req.headers.authorization
    if(!userToken || !userToken.startsWith("Bearer ")){
        return res.status(400).json({msg: "Authentication failed"})
    }
    const splitToken = userToken.split(" ")[1]
    try {
        const payload = jwt.verify(splitToken, process.env.jwt_secret)
        if(!payload){
        return res.status(400).json({msg: "Authentication failed"}) 
        }
        req.user = {userId: payload.userId, name: payload.name}
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = aunthenticate 
