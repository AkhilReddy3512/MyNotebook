import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

const NoteItem = (props) => {
    const {showAlert} = props;
    const { note, updateNote} = props;
    const context = useContext(NoteContext);
    const { deleteNote} = context;

    return (
        <div className='col-md-3'>
            <div className="card border-dark text-light my-2">
                <div className="card-header border-light">
                    {note.tag}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-file-pen mx-2" onClick={()=>{updateNote(note)}}></i>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);showAlert("note Deleted","danger");}}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
