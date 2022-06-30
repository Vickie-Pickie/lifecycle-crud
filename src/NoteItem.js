import PropTypes from 'prop-types';

function NoteItem(props) {
  const { note, onDeleteNote } = props;

  const handleDelete = () => {
    fetch(`http://localhost:7777/notes/${note.id}`, {
      method: "DELETE",
    })
      .then(() => onDeleteNote());
  }
  return (
    <div className="note_item">
      <div className="note_content">{note.content}</div>
      <button type="submit" className="delete_button">
        <span className="material-icons" onClick={() => handleDelete()}>close</span>
      </button>
    </div>
  )
}

export default NoteItem;

NoteItem.propTypes = {
  onDeleteNote: PropTypes.func.isRequired,
  note: PropTypes.shape(
    {
      id: PropTypes.number,
      content: PropTypes.string,
    }
  ),
};
