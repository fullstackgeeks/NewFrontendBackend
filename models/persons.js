require('dotenv').config()

//Mongoose part
//-----------------------------------
const mongoose = require('mongoose')

// if(process.argv.length<3)
// {
//     console.log('Give password as argument')
//     process.exit()
// }

// const password = encodeURIComponent(process.argv[2])

console.log("process argv 0 : ", process.argv[0])
console.log("process argv 1 : ", process.argv[1])
console.log("process argv 2 : ", process.argv[2])



const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

console.log("Connect to ", url)

mongoose.connect(url).then(result => {
    console.log('Connected to MongoDB')
}).catch(error => {
    console.log('error connecting to MongoDB : ',error.message)
})



const personSchma = new mongoose.Schema({
    name:String,
    number: String,
})



//To delete the mongoDB version attached to the notes
personSchma.set('toJSON', {
    transform:(document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Persons', personSchma)