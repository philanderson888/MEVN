/*
module.exports = { 
    db: 'mongodb://localhost:27017/students'
 }
 */
 const dotenv = require('dotenv').config().parsed
 console.log(`mongo db username is ${process.env.VUE_APP_MONGO_DB_USERNAME}`)
 console.log(`mongo db password is ${process.env.VUE_APP_MONGO_DB_PASSWORD}`)
 module.exports = {
    db: `mongodb+srv://${process.env.VUE_APP_MONGO_DB_USERNAME}:${process.env.VUE_APP_MONGO_DB_PASSWORD}@cluster0.iilta.mongodb.net/database?retryWrites=true&w=majority`
 }