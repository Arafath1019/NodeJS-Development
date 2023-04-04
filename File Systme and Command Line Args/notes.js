const fs = require('fs');

const getNotes = () => 'Your notes....';

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicatedNotes = notes.filter((note) => {
        return note.title === title;
    })

    if (duplicatedNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
        savedNotes(notes);
    } else {
        console.log('Note title already taken');
    }
};

const removeNote = (title) =>{
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => {
        return note.title !== title;
    });

    if(notes.length > notesToKeep.length){
        console.log('Note Removed!');
        savedNotes(notesToKeep);
    } else{
        console.log('No note found');
    }
}

const readNote = (title) =>{
    const notes = loadNotes();
    const searchedNote = [];
    notes.forEach((note) => {
        if(note.title === title){
            searchedNote.push(note);
        }
    });

    if(searchedNote.length > 0){
        console.log(searchedNote[0].title);
        console.log(searchedNote[0].body);
    } else {
        console.log('No note found');
    }

};

const listNotes = () => {
    const notes = loadNotes();
    console.log('Your Notes');
    notes.forEach(note => {
        console.log(note.title);
    });
}

const savedNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
}

const loadNotes =() =>{
    try{
        return JSON.parse(fs.readFileSync('notes.json').toString());
    } catch (e){
        return [];
    }
};

module.exports = {
    getNotes,
    addNote,
    removeNote,
    listNotes,
    readNote
}