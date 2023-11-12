import { useState } from "react";
import "./App.css";
import Preview from "./components/preview";
import Message from "./components/message/message";
import NotesSection from "./components/Notes/NotesSection";
import NotesList from "./components/Notes/NotesList";
import Notes from "./components/Notes/Notes";

function App() {
  const [note, setNote] = useState({
    notes: [],
    title: "",
    content: "",
    selectedNote: null,
    creating: false,
    editing: false,
  });
  //change title of note
  function changeTitleHandle(e) {
    setNote((prevNote) => ({
      ...prevNote,
      title: e.target.value,
    }));
  }
  //change content of note
  function changeContentHandle(e) {
    setNote((prevNote) => ({
      ...prevNote,
      content: e.target.value,
    }));
  }
  // save note
  const saveNotHandler = () => {
    const notek = {
      id: new Date(),
      title: note.title,
      content: note.content,
    };
    const updateNotes = [...note.notes, notek];
    setNote((prevNote) => ({
      ...prevNote,
      notes: updateNotes,
      creating: false,
      selectedNote: notek.id,
      title: "",
    content: "",
    }));
  };
  //Select Note
function selectedNotHandler(noteId){
  setNote((prevNote) => ({
    ...prevNote,
    selectedNote:noteId
     
  }));
}
  


    function addNoteHandle(){
    setNote((prevNote) => ({
      ...prevNote,
      creating: true
    }));
  }

  const getAddNote = () => {
    return (
      <>
        <h2>إضافة ملاحظة جديدة</h2>
        <div>
          <input
            type="text"
            name="title"
            className="form-input mb-30"
            placeholder="العنوان"
            value={note.title}
            onChange={changeTitleHandle}
          />

          <textarea
            rows="10"
            name="content"
            className="form-input"
            placeholder="النص"
            value={note.content}
            onChange={changeContentHandle}
          />

          <a href="#" className="button green" onClick={saveNotHandler}>
            حفظ
          </a>
        </div>
      </>
    );
  };

  const getPreview = () => {
    if (note.notes.length === 0) {
      return <Message content="لا يوجد ملاحظة اخري" />;
    }
    if (!note.selectedNote) {
      return <Message content="الرجاء اختيار ملاحظة اخري " />;
    }
    const rbg = note.notes.find((n) => n.id === note.selectedNote);
    console.log(rbg);
    if (!rbg) {
      return <Message content="Error: rbg note not found" />;
    }

    return (
      <>
        <div className="note-operations">
          <a href="#">
            <i className="fa fa-pencil-alt" />
          </a>
          <a href="#">
            <i className="fa fa-trash" />
          </a>
        </div>
        <div>
          <h2>{rbg.title}</h2>
          <p>{rbg.content}</p>
        </div>
      </>
    );
  };
    const NoteLi = note.notes.map((k)=>(
      <Notes key={k.id} title={k.title} content={k.content}  noteClicked= {()=> selectedNotHandler(k.id)}  active ={note.selectedNote === k.id}/>
    ))
  return (
    <div className="App">
      <NotesSection>
      <NotesList>
      {NoteLi}
      </NotesList>
      <button className="add-btn" onClick={addNoteHandle}>+</button>
      </NotesSection>
      <Preview>{note.creating ? getAddNote() : getPreview()}</Preview>
      </div>

      // {/* <div className="notes-section">
      //   <ul className="notes-list">
      //     <li className="note-item">ملاحظة رقم #1</li>
      //     <li className="note-item">ملاحظة رقم #2</li>
      //     <li className="note-item">ملاحظة رقم #3</li>
      //     <li className="note-item">ملاحظة رقم #4</li>
      //   </ul>
          
      // </div> */}
    
    
  );
}

export default App;
