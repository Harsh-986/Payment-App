const express = require('express');
const { user, userIn } = require('../MongoSchema');
const {mainRouter} = require("./routes/index.js")
const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.json())

app.use("/api/v1", mainRouter) 
app.use("/api/v1/users",userRouter)



app.listen(3000)