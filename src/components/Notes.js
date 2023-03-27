import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    let navigate = useNavigate();
    const {showAlert} = props;
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])

    const [note, setNote ] = useState({id:"", edittitle:"", editdescription:"",edittag:"default"});

    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id :currentNote._id, edittitle :currentNote.title, editdescription :currentNote.description, edittag :currentNote.tag});
        
    }

    const handleOnClick = (e) => {
        editNote(note.id, note.edittitle, note.editdescription, note.edittag);
        refClose.current.click();
        showAlert("notes Updated Succesfully","success");
    }

    const handleOnChange = (e) => {
        setNote({...note,[e.target.name]: e.target.value});
    }
    return (
        <>
            <AddNote showAlert={showAlert}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
                Launch static backdrop modal
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="edittitle" className="form-label">Title of Note</label>
                                    <input type="text" className="form-control" id="edittitle" name="edittitle" value={note.edittitle} aria-describedby="edittitleHelp" onChange={handleOnChange} minLength={3} required={true}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editdescription" className="form-label">Enter Description</label>
                                    <input type="text" className="form-control" id="editdescription" name="editdescription" value={note.editdescription } onChange={handleOnChange} minLength={5} required={true}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edittag" className="form-label">Enter Tag</label>
                                    <input type="text" className="form-control" id="edittag" name="edittag" value={note.edittag} onChange={handleOnChange}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                            <button disabled={note.edittitle.length<3 || note.editdescription.length<10} type="button" className="btn btn-success" onClick={handleOnClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h3>Your notes</h3>
                <div className="container">
                    {notes.length === 0 && "No Notes to display"}
                </div>
                <div className="row my-3">
                    {notes.map((note) => {
                        return <NoteItem key={note._id} updateNote={updateNote} showAlert={showAlert} note={note} />;
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
