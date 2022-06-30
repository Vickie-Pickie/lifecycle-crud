import {
  useState,
  useEffect,
} from 'react';
import './App.css';
import FormComponent from './FormComponent';
import NoteItem from './NoteItem';

function App() {
  const [notesList, setNotesList] = useState([]);

  const getNotes = async () => {
    try {
      const response = await fetch('http://localhost:7777/notes');
      const data = await response.json();
      setNotesList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const onAddNote = async () => {
    await getNotes();
  };

  const handleRefresh = (e) => {
    e.preventDefault();
    getNotes();
  };

  const onDeleteNote = () => {
    getNotes();
  };

  return (
    <div className="App">
      <div className="title_wrap">
        <h3 className="title">Заметки</h3>
        <button className="refresh_button" onClick={handleRefresh}>
          <span className="material-icons">autorenew</span>
        </button>
      </div>
      <div className="notes_list">
        {
          notesList.map((note) => {
            return (
              <NoteItem key={note.id} note={note} onDeleteNote={onDeleteNote}/>
            )
          })
        }
      </div>
      <FormComponent onAddNote={onAddNote} />
    </div>
  );
}

export default App;
