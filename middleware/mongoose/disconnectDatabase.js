// import mongoose from "mongoose"
const mongoose = require("mongoose")

async function disconnectDb() {
    await mongoose.disconnect()
}

disconnectDb()