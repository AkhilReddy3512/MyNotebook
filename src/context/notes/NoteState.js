import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);


    //FETCH ALL NOTES
    const getNotes = async ()=>{
      //API Call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = await response.json();
      console.log(json);
      setNotes(json);
    }
    //ADD NOTE
    const addNote = async (title, description, tag) =>{
      //API Call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag}), 
      });
      const note = await response.json();
      setNotes(notes.concat(note)); 
    }


    //EDIT NOTE
    const editNote = async (id, title, description, tag)=>{
      //API Call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag}), 
      });
      const json = await response.json();
      console.log(json);

      let newNotes = JSON.parse(JSON.stringify(notes))
      //logic for updating the notes
      for(let i=0;i<newNotes.length;i++){
        const element = newNotes[i];
        if(element._id === id){
          newNotes[i].title = title;
          newNotes[i].description = description;
          newNotes[i].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    }


    //DEELETE NOTE
    const deleteNote = async (id)=>{
      //API Call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = await response.json();
      console.log(json);

      //logic for deleting the notes
      console.log("deleting note with id "+ id);
      const newNotes = notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{notes, addNote, editNote, deleteNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;