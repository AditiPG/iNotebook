import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({title : "", description : "", tag : ""});
  const handleClick=(e)=>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title : "", description : "", tag : ""});
    props.showAlert("Note added successfully","success")
  }
  const onChange=(e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <div className="container">
      <h2 className="heading" >Add Note</h2>
      <form my-3>
        <div className="mb-3">
          <label htmlfor="title" className="form-label heading">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            value={note.title}
            onChange={onChange}
            
          />
          
        </div>
        <div className="mb-3">
          <label htmlfor="description" className="form-label heading">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            value={note.description}
           
          />
        </div>

        
        <div className="mb-3">
          <label htmlfor="tag" className="form-label heading">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            value={note.tag}
           
          />
        </div>
        
        <button type="submit" className="btn note-submit" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;
