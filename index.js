const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
require("dotenv").config({ path: "./.env" })

const app = express()
app.use(express.static("uploads"))
app.use(express.json())
app.use(cors())

app.use("/api", require("./routes/blogRoutes"))

app.use("*", (req, res) => {
    res.status(404).json({ message: "resource not found" })
})
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || "something went wrong" })
})
mongoose.connect(process.env.MONGO_URL)

mongoose.connection.once("open", () => {
    console.log("mongo connected")
    app.listen(process.env.PORT, console.log("server running"))
})






