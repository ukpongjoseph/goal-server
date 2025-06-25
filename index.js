require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const PORT = process.env.PORT || 1250
const authRouter = require('./Routes/authRoute')
const goalRouter = require('./Routes/goalRoutes')
const auth = require('./Middleware/aunthentication')
const badRoute = require('./Utils/notfound')

app.use(express.json())
app.use('/user/v1', authRouter)
app.use('/user/v1/goals', auth, goalRouter)
app.get('/', (req, res)=>{
    res.status(200).json({success: true, message: "server is live"})
})
app.use(badRoute)
const startServer = async () => {
    try {
        await mongoose.connect(process.env.dbURL)
        app.listen(PORT, () => {
            console.log(`server is listening on port ${PORT} and database is connected`)
        })
    } catch (error) {
        console.log(error)
    }
}
startServer()