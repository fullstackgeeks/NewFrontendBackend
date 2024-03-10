//WEB SERVER APPLICATION

// console.log("Hello world server!!!")

//NODE

// const http = require('http')

// let notes = [
//     {
//         id:1,
//         content:"HTML is easy",
//         important:true
//     },
//     {
//         id:2,
//         content:"Lopsum 1",
//         important:true
//     },
//     {
//         id:3,
//         content:"Lopsum 2",
//         important:true
//     }
// ]

// const app = http.createServer((request, response) => {

//     response.writeHead(200, {
//         'Content-Type':'text/plain'})

//     response.end('Hello World')
// })

// const app = http.createServer((request, response) => {

//     response.writeHead(200, {
//         'Content-Type':'application/json'})

//     response.end(JSON.stringify(notes))
// })



// const PORT = 3001
// app.listen(PORT)
// console.log('Server running on port', PORT)






//EXPRESS

// require('dotenv').config()


const express = require('express')

const cors = require('cors')


const app = express()

app.use(express.static('dist'))

//importing the note module:
const Persons = require('./models/persons')


//To establish cross-origin with the frontend and backend
app.use(cors())

//To retrieve the sent data easily we need express middleware
//without it, the data will be undefined
app.use(express.json())


//Used to handle the logging of information in an application
const morgan = require('morgan')

// let notes = [
//     {
//         id:1,
//         content:"HTML is easy",
//         important:true
//     },
//     {
//         id:2,
//         content:"Lopsum I",
//         important:true
//     },
//     {
//         id:3,
//         content:"Lopsum II",
//         important:true
//     }
// ]


//creating morgan token
morgan.token('body', (req)=>JSON.stringify(req.body))



// //Mongoose part
// //-----------------------------------
// const mongoose = require('mongoose')

// // if(process.argv.length<3)
// // {
// //     console.log('Give password as argument')
// //     process.exit()
// // }

// const password = encodeURIComponent(process.argv[2])

// console.log("process argv 0 : ", process.argv[0])
// console.log("process argv 1 : ", process.argv[1])
// console.log("process argv 2 : ", process.argv[2])



// const url = `mongodb+srv://mulinjanuary:${password}@cluster0.gpknhm7.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

// mongoose.set('strictQuery', false)

// mongoose.connect(url)

// const noteSchma = new mongoose.Schema({
//     content:String,
//     important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchma)

// //To delete the mongoDB version attached to the notes
// noteSchma.set('toJSON', {
//     transform:(document, returnedObject) => {
//         returnedObject.id = returnedObject._id.toString()
//         delete returnedObject._id
//         delete returnedObject.__v
//     }
// })
//---------------------------------------------------------------------------







//using morgan for the whole logging of the application
// app.use(morgan('combined'))
app.use(morgan(':method :url :status - :response-time ms :body'))




// let persons = [
//     {
//         "id":1,
//         "name":"Arto Hellas",
//         "number":"040-123456",
//         "important": true
//     },
//     {
//         "id":2,
//         "name":"Ada Lovelace",
//         "number":"34-44-5323523",
//         "important": false
//     },
//     {
//         "id":3,
//         "name":"Don Abramov",
//         "number":"12-43-234345",
//         "important": false
//     },
//     {
//         "id":4,
//         "name":"Mary Poppendieck",
//         "number":"39-23-6423122",
//         "important": true
//     }
// ]



var filterName = []



//Process arguments 

// const userName = process.argv[2]

// console.log("Process argument 2 : ", userName)

// const userNumber = process.argv[3]

// console.log("Process argument 3 : ", userNumber)


// if(userName!==undefined && userNumber!==undefined)
// {
//     console.log("The name and number will be saved in the phonebook...")

//     const person = new Persons({
//         name:userName,
//         number:userNumber
//       })

//    person.save().then(savedUser => {
//     console.log("SavedUser is : ", savedUser)
//    })

// }
// else if(userName===undefined && userNumber===undefined){
//     console.log("Since the argument 2 and 3 are not provided, the application will only show the list in the phonebook...")

//     Persons.find({}).then(persons => {
//         console.log(persons)
//     })

// }
// else
// {
//     console.log("Do nothing")
// }





app.get('/', (request, response) => {
    try{
        const htmlcontent = 
            `<div>
                <h1>Hello World</h1>
             </div>
            `
    response.send(htmlcontent)
    }
    catch (error) {
        console.error("Error", error)
        response.status(500).send('Internal Server Error')
    }
   
})





const now = new Date()

//using morgan for logging of just a particular route

// app.get('/api/info', morgan('tiny'), (request, response) 




app.get('/api/info', (request, response) => {
        const htmlcontent = 
            `<div>
            <h1>Phone Book</h1>
            <p>Phonebook has info for ${persons.length} people </p>
            <p>${now}}</p>
            </div>
            `  
    response.send(htmlcontent)
   
})

// app.get('/api/notes', (request, response) => {
//     response.json(notes)
//     // response.send(notes)

// })




// app.get('/', (request, response) => {
//     response.send('<h1>Hello World!</h1>')
// })


//GET for the database MongoDB 
app.get('/api/persons', (request, response) => {
    Persons.find({}).then(persons => {
        response.json(persons)
    })
   
})




// app.get('/api/persons', (request, response) => {
//     response.json(persons)
// })










// app.get('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const person = persons.find(data=>data.id===id)
//     // console.log("The note found for the id is : ",person)
//         if(person)
//             {
//                 console.log("Id found")
//                 response.json(person)
//             }
//             else{
//                         console.log("Id doesn't exist")
//                         response.status(404).json({error:"Id doesn't exist"})
//                     }
    
// })





// const generateId = () => {
//     const maxId = persons.length > 0 ? Math.max(...persons.map(n=>n.id)) : 0
//     return maxId+1
// }


const generateRandomId = () => {
    const maxId = Math.floor(Math.random()*30) + 5
    return maxId
}


// //PUT
// app.put('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const body = request.body

//     console.log("Id is : ", id)


//     const findUser = persons.find(data => data.id === id)

//     if(!findUser)
//     {
//         console.log("User not found")
//         response.status(404).send("User not found")
//     }
   
//    else{
//         findUser.name = body.name,
//         findUser.number = body.number
//    console.log("User Updated : ",body)
//     response.json(persons)
// }
//     // console.log("id called to be changed is : ", id)
//     // res.send(id)
// })





// //PUT
// app.put('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const body = request.body

//     const changedUser = persons.find(data => data.id === id)

//     console.log("this is body of the put request: ", body)

//     if(!changedUser)
//     {
//         console.log("User info not found")
//         response.status(404).json({error:"User info not found"})
//     }
//     else{
//         if(changedUser.number === body.number){

//             changedUser.important= body.important
//             console.log("User important info updated")
//             response.json(persons)
           
//         }
//         else{
//             changedUser.number= body.number
//             console.log("User number info updated")
//             response.json(persons)
//         }
        
//     }

// })









//PUT for database MongoDB
app.put('/api/persons/:id', async (request, response, next) => {
    const body = request.body

    const id = request.params.id

    const note = {
        name: body.name,
        number: body.number
    }

    const searchedUser = await Persons.findById(id)
    
    console.log("Searched User name : ", searchedUser.name)

    console.log("Searched User number : ", searchedUser.number)

    // return response.status(400).json({info: "User searched using id"})

    if(searchedUser)
    {
        console.log("User exist...")

        if(searchedUser.number === body.number)
        {
            console.log("User number  is the same")
            return response.status(400).json({info: "User number is the same"})
        }
        else{
            console.log("User number not the same")

            Persons.findByIdAndUpdate(request.params.id, note, {new:true}).then(updatedUser => {
            console.log("Updated Note is : ", updatedUser)
            if(updatedUser){
                console.log("User details updated")
                response.json(updatedUser)
            }
            else
            {
                response.status(404).send({error: 'Note id not found'})
            }
        
        }).catch(error => {
            console.error(error.message)
            response.status(404).send({error: 'Error occured in updating the note'})
        })
            // return response.status(400).json({info: "User number is not the same"})
        }

        // return response.status(400).json({info: "User found in the database"})
    }
    else{
        console.log("User not found in the database")
        return response.status(400).json({info: "User not found in the database"})
    }




})


















//POST
// app.post('/api/persons', (request, response) => {
//     const body = request.body
//     console.log(body)
    
//     filterName = persons.filter(data => data.name.toLowerCase().includes(body.name.toLocaleLowerCase()))

  
//     if(!body.name || !body.number)
//   {
//     console.log("There is a name in the body of the request")
    
//     return response.status(400).json({
//                     error:"name or number is missing"
//                 })

//   }
//   else if(filterName.length===1){
//     console.log("Name found : ",filterName)
//     return response.status(200).json({
//         error:"name found"
//     })
//   }

// //   else if(filterName.length === 0)
// //   {
// //     console.log("Name not found")
// //     // return response.status(400).json({
// //     //     error:"name not found"
// //     // })
// //   }



//       const personinfo = {
//         id:generateRandomId(),
//         name:body.name,
//         number:body.number,
//         important:body.important
//     }

//     persons = persons.concat(personinfo)

//     console.log(persons)
//     response.json(persons)

// })







//POST to the backend MongoDB
app.post('/api/persons', async (request, response) => {
    const body = request.body
    console.log(body)
    
    console.log("Request is received from frontend")
    console.log("Body of the request from frontend is : ", body)

  
    if(body.name === undefined &&  body.number === undefined)
  {
    console.log("Name and number are missing")
    
    return response.status(400).json({error:"content is missing"})

  }

//     const checkUser = Persons.findOne(body.name)
//   console.log("All Users : ", checkUser)

  const allUsers = await Persons.find({});

    console.log("All users : ", allUsers)

    const findUser = allUsers.find(user => user.name === body.name)

    if(findUser)
    {
        return response.status(404).send({info: "User exist in the database"})
  
    }
    else{


        // Define custom validator function
        // function validatePhoneNumber(phone) {
        // return /\d{3}-\d{3}-\d{4}/.test(phone);
        // }
  
  // Define the user schema
//   const userSchema = new Schema({
//     phone: {
//       type: String,
//       validate: {
//         validator: validatePhoneNumber,
//         message: props => `${props.value} is not a valid phone number!`
//       },
//       required: [true, 'User phone number required']
//     }
//   });




        
      const person = new Persons({
        name:body.name,
        number:body.number
      })

           person.save().then(savedUser => {
    console.log("SavedNote is : ", savedUser)
    return response.json(savedUser)
   }).catch(err => {

     // Check if there are validation errors
     if (err.errors) {
        // Check if there are errors for the `name` field
        if (err.errors.name) {
          console.log('Name validation error:', err.errors.name.message);
        }
        // Check if there are errors for the `phone` field
        if (err.errors.number) {
          console.log('Phone validation error:', err.errors.number.message);
        }
      } else {
        // Log other errors
        console.error(err);
      }
   })
       
    }

   

  
//  allUsers.map(result => {
//     if(result.name === body.name)
//     {
//         checking= true
//     }
//   })

//   if(checking)
//   {
//     console.log("User name already in the database...")
//   }

    //   const person = new Persons({
    //     name:body.name,
    //     number:body.number
    //   })

//    person.save().then(savedUser => {
//     console.log("SavedNote is : ", savedUser)
//     response.json(savedUser)
//    })

})






//Finding an individual note
//GET with id for database MongoDB
app.get('/api/persons/:id', (request,response, next) => {
    console.log("Id is : ", request.params.id)
    Persons.findById(request.params.id).then(person => {
        console.log("Note retrieved: ", person)
        if(person)
        {
            response.json(person)
        }
        else {
            response.status(404).end()
        }
       
    }).catch(error => {
        console.log(error)
        // response.status(500).end()
        // response.status(400).send({error: 'malformatted id'})
        next(error)

    })
})






// //DELETE
// app.delete('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const person = persons.find(data=>data.id===id)
//     if(person)
//     {
//         persons = persons.filter(data =>data.id!==id)
//         console.log("Person is deleted...")
//         response.status(204).end() 
//     }
//     else{
//         console.log("Person doesn't exist in the phonebook")
//         response.status(404).end() 
//     }
    
// })







//DELETE for database MongoDB 
app.delete('/api/persons/:id', (request, response, next) => {
  Persons.findByIdAndDelete(request.params.id).then(result => {
    console.log("Result is : ", result)
    response.status(204).end()
  }).catch(error => {
//    console.error(error.message)
//    response.status(404).send({error: 'Error occured'})
    next(error)
  })
    
})













// console.log("note id is : ", typeof(note.id))
// console.log("id is : ", typeof(id))





// app.get('/api/notes/:id', (request, response) => {
//     const id =Number(request.params.id)
//     const note = notes.find(note=>note.id===id)
//     console.log("The note found for the id is : ",note)
    
//     //To handle if an id number doesn't exist
//     if(note)
//     {
//         response.json(note)
//     }
//     else{
//         console.log("Id doesn't exist")
//         response.status(404).end()
//     }
// })







//deleting resources

// app.delete('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const note = notes.find(note=>note.id===id)
//     if(note)
//     {
//         notes = notes.filter(note =>note.id!==id)
//         console.log("Note id deleted...")
//         response.status(204).end() 
//     }
//     else{
//         console.log("Id doesn't exist")
//         response.status(404).end() 
//     }
    
// })











// const generateId = () => {
//     const maxId = notes.length > 0 ? Math.max(...notes.map(n=>n.id)) : 0
//     return maxId+1
// }



//Posting resources
// app.post('/api/notes', (request, response) => {
//     const body = request.body

//     //checking the content part of the sent data
//     if(!body.content)
//     {
//         return response.status(400).json({
//             error:"content missing"
//         })
//     }

//     const note = {
//         id:generateId(),
//         content:body.content,
//         important:Boolean(body.important)
       
//     }

//     notes = notes.concat(note)

//     console.log(note)
//     response.json(note)
// })






//MIDDLEWARE for unknown endpoints
const unknownEndpoint = (request, response) => {
    console.log("control is now here")
    response.status(404).send({Error:'unknownEndpoint, please check and use the correct endpoint'})
}

app.use(unknownEndpoint)

//Middleware to handle all errors
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if(error.name === 'CastError'){
        return response.status(400).send({error: 'malformatted id'})
    }
  
    next(error)
}

app.use(errorHandler)




const PORT = process.env.PORT||3001
app.listen(PORT, ()=> {console.log('Server running on port', PORT)})


















