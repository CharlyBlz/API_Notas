const express = require("express")
const tools = require("./tools.js")
const app = express()
app.use(express.json())

// Punto de entrada para probar el servidor express
app.get("/",(request,response)=>{
    response.send("<h1>Hello Backend!</h1>")
})

app.post("/api/notes",(request,response)=>{
    const note = request.body
    console.log(note)
    const result = tools.addNote(note.title,note.body)
    if(result){
        response.status(200).end()
    }else{
        response.status(400).end()
    }
})

app.get("/api/notes/:id",(request,response)=>{
    const id = Number(request.params.id)
    console.log(id)
    const result = tools.readOneNote(id)

    if(result){
        response.json(result)
    }else{
        response.status(404).end()
    }
    console.log(result)
})

app.get("/api/notes",(request,response)=>{
    const result = tools.loadNotes()
    if(result.length>0){
        response.json(result)
        response.status(200).end()
    }else{
        response.status(204).end()
    }
    //const notes = tools.loadNotes()
    //response.json(notes)
})

app.delete("/api/notes/:id",(request,response)=>{
    const id = Number(request.params.id)
    const note = tools.removeNote(id)
    if(note){
        console.log("Note Eliminada")
        response.status(200).end()
    }else{
        console.log("Algo salió mal ¯|_(ツ)_/¯ ")
        response.status(404).end()
    }
})
 //La validación en una API es súmamente importante, por tanto, se deben considerar todos los casos/escenarios posibles.
app.put("/api/notes/:id",(request,response)=>{
    const id = Number(request.params.id)
    const ntitle = request.body.title 
    const nbody = request.body.body
    const result = tools.modifyNote(id,ntitle,nbody)
    if(result){
        response.status(200).end()
    }else{
        response.status(404).send("Not Found!")
    }
})
app.patch("/api/notes/:id",(request,response)=>{
    const id = Number(request.params.id)
    const body = request.body.body
    console.log(id)
    const result = tools.ModifyNote(id,body)
    if(result){
        response.status(200).end()
    }else{
        response.status(404).end()
    }
})


const PORT = 3001
app.listen(PORT,()=>{
    console.log("Starting server on port 3001")
})