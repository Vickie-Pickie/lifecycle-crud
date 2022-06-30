import { useState } from 'react';
import PropTypes from 'prop-types';

const shortid = require('shortid');


function FormComponent(props) {
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note) {
      return;
    }

    const notesObj = {
      id: shortid.generate(),
      content: note,
    };
    fetch('http://localhost:7777/notes', {
      method: "POST",
      body: JSON.stringify(notesObj),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
      .then(() => props.onAddNote());

    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} className="form_wrapper">
        <label htmlFor="textareaId">Новая заметка</label>
        <div className="textarea_wrapper">
          <textarea name="textarea" id="textareaId"
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Введите текст заметки"
                    value={note}
                    rows="5"
                    cols="40"
          >
        </textarea>
          <button type="submit" className="submit_button">
            <span className="material-icons">send</span>
          </button>
        </div>
    </form>
  );
}

export default FormComponent;

FormComponent.propTypes = {
  onAddNote: PropTypes.func.isRequired,
};
