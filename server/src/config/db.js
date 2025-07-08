import mongoose from 'mongoose'

export const connectDatabase = async () => {

    const MONGO_URI = process.env.MONGO_URI
    
    mongoose
        .connect(MONGO_URI)
        .then(() => {
            console.log("MongoDB Established")
        })
        .catch((err) => {
            console.log("Error Connecting: " + err)
        })
}