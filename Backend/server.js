require("dotenv").config();

const app = require("./src/app")
const connectDB  = require("./src/db/db")
const urlRouter = require('./src/routes/route.url')



connectDB();
app.use('/url', urlRouter)


app.listen(3000, ()=>{
    console.log("Server is Live")
})