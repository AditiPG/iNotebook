import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate= useNavigate();
  const { notes , getNotes, editNote} = context;
  useEffect(()=>{
    if(localStorage.getItem('token')){
      getNotes();
    }
   
    else{
      navigate("/login")
    }

  });

const ref= useRef(null);
const refClose= useRef(null);
const [note, setNote] = useState({id: "",etitle : "", edescription : "", etag : ""});
const handleClick=(e)=>{
  //console.log("Updatting the note", note)
  editNote(note.id, note.etitle, note.edescription, note.etag);
  refClose.current.click();
  props.showAlert("Updated successsfully", "success");
}
const onChange=(e)=>{
  setNote({...note, [e.target.name]: e.target.value})
}

const updateNote=(currentnote)=>{
  ref.current.click();
  setNote({id: currentnote._id,  etitle:currentnote.title, edescription: currentnote.description, etag: currentnote.tag});
 

}
  return <>
   <AddNote showAlert={props.showAlert}/>
   <button type="button"  ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-etitle fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form my-3>
        <div className="mb-3">
          <label for="etitle" className="form-label">
            title
          </label>
          <input
            type="text"
            className="form-control"
            id="etitle"
            name="etitle"
            aria-describedby="emailHelp"
            value={note.etitle}
            onChange={onChange}
          />
          
        </div>
        <div className="mb-3">
          <label for="edescription" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="edescription"
            name="edescription"
            value={note.edescription}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>

        
        <div className="mb-3">
          <label for="etag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="etag"
            name="etag"
            value={note.etag}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        
        
      </form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn note-submit" data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={handleClick} className="btn note-submit">Update Note</button>
      </div>
    </div>
  </div>
</div>
   
        <div className="row my-3">
          <h2 className="heading">Your notes</h2>
          <div className="container">
          {notes.length===0  && ' No notes to display'}
          </div>
          {notes.map((note) => {
            return (
          <Noteitem updateNote={updateNote} note={note} showAlert={props.showAlert}  />
  )})}
  </div>
  </>
   
};

export default Notes;
