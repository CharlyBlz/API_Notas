const fs = require('fs')
const addNote = function(title,body){
    console.log("El título de la nota:", title)
    console.log("El cuerpo de la nota:", body)
    const notes = loadNotes()
    const maxId = notes.lenght > 0 ? Math.max(...notes.map(n=>n.id)) : 0
    console.log(maxId)
    //Validar que nota no esté duplicada
    const duplicateNote = notes.find((note)=> note.title === title)
    if(!duplicateNote){
        id = maxId+1
        notes.push(
            {
                id:id,
                title:title,
                body:body
            }
        )
        // Guardar en el archivo
        saveNotes(notes)
        console.log("Notas creadas")
        return true        
    } else{
        console.log("Nota duplicada")
        return false
    }
}
// function (id)
const readOneNote = function(id){
    const notes = loadNotes()
    console.log(notes)
    const note = notes.find((note)=>note.id === id)
    if(note){
        console.log("Nota encontrada")
        console.log(note.id, note.title, note.body)
        return note
    }else{
        console.log("Nota no encontrada")
        return false
    }
}
const saveNotes = function(notes){
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json", dataJSON)
}
const loadNotes= function() {
    try{
        const dataBuffer = fs.readFileSync("notes.json")
        // Buena práctica: pasar el contenido a un buffer temporal
        const dataJSON = dataBuffer.toString() 
        return JSON.parse(dataJSON) //devuelve lista llena
    } catch(e){
        return[] //devuelve lista vacía
    }
}
const removeNote = function(id){    
    //console.log("From tools title:", title)
    const notes = loadNotes()
/* Leemos el archivo JSON (archivo de texto)
Eliminamos la nota
Sobreescribimos la lista (archivo JSON)
JSON: archivo para transacciones en la red (internet)
*/
    // console.log(notes)
    //const notesToKeep = notes.filter((note)=>note.id != id)
    //console.log("From tools notes:", notes)
    
    const notesToKeep = notes.filter((note)=>note.id != id)
    //console.log("From tools notesToKeep:", notesToKeep)
    if(notes.length > notesToKeep.length){
        console.log("Note removed!")
        saveNotes(notesToKeep)
        return true
    }else{
        console.log("Note not found!")
        return false
    }
}

const modifyNote = function(id, ntitle, nbody){
    const nota = readOneNote(id)
    const aux_id = nota.id
    removeNote(id)
    const notes = loadNotes()
    // Buscamos el índice de la nota que queremos modificar mediante su "título"
    //const pos = notes.findIndex((note)=>note.id === id)
    const duplicateNote = notes.find((note)=>note.id === aux_id)
    if(!duplicateNote){
        notes.push({
            id:aux_id,
            title:ntitle,
            body:nbody
        })
    
        // Reescribimos el archivo JSON con la(s) nota(s) modificada(s)
        saveNotes(notes)
        console.log("Nota modificada")
        return true
    }else{
        console.log("Nota no existe")
        return false
    }

}

const ModifyNote = function(id,body){
    const notes = loadNotes()
    const body1 = body
    const note2modify = notes.find((notes)=>notes.id===id)
    note2modify.body = body1
    const title = note2modify.title
    const found_id = note2modify.id
    if(notes){
        const removeNote = notes.filter((notes)=>notes.id!=id)
        saveNotes(removeNote)
        removeNote.push({
            id:found_id,
            title:title,
            body:body1
        })
        saveNotes(removeNote)
    }
    else{
        console.log('Nota no encontrada')
    }
}

module.exports = {
    addNote:addNote,
    loadNotes:loadNotes,
    saveNotes:saveNotes,
    removeNote:removeNote,
    readOneNote:readOneNote,
    modifyNote:modifyNote,
    ModifyNote:ModifyNote
}