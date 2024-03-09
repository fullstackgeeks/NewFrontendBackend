const mongoose = require('mongoose')





if(process.argv.length<3)
{
    console.log('Give password as argument')
    process.exit()
}

const password = encodeURIComponent(process.argv[2])

// console.log("process argv 0 : ", process.argv[0])
// console.log("process argv 1 : ", process.argv[1])
// console.log("process argv 2 : ", process.argv[2])



const url = `mongodb+srv://mulinjanuary:${password}@cluster0.gpknhm7.mongodb.net/PhonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchma = new mongoose.Schema({
    name:String,
    number: String,
})

const Persons = mongoose.model('Persons', personSchma)


const person = new Persons({
   name: 'Arto Hellas',
    number: "040-657940478"
})


//Saving data to database

person.save().then(result => {

    console.log('User name and number saved!')
    mongoose.connection.close()
})




//Fetching data from database
// Note.find({}).then(result => {
//     result.forEach(note => {
//         console.log(note)
//     })
//     mongoose.connection.close()
// })







