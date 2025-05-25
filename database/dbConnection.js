
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING,)
        console.log(`MongoDB Connected Successfully: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

module.exports = connectDB
