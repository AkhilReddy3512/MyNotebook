import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'

const AddNote = (props) => {
    const {showAlert} = props;
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote ] = useState({title:"", description:"",tag:""});
    const handleOnClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"",tag:""});
        showAlert("notes Added Succesfully","success");
    }

    const handleOnChange = (e) => {
        setNote({...note,[e.target.name]: e.target.value});
    }

    return (
        <div className="container my-3">
            <h3>Add a Note</h3>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title of Note</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="titleHelp" value={note.title} onChange={handleOnChange} minLength={3} required={true}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description"className="form-label">Enter Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleOnChange}  minLength={5} required={true}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag"className="form-label" >Enter Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" placeholder='Default' value={note.tag} onChange={handleOnChange}  />
                </div>   
                <button disabled={note.title.length<3 || note.description.length<10} type="submit" className="btn btn-dark" onClick={handleOnClick} >AddNote</button>
            </form>
        </div>

    )
}

export default AddNote

