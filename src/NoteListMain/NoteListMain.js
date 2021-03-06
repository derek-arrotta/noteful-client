import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Note from "../Note/Note";
import CircleButton from "../CircleButton/CircleButton";
import ApiContext from "../ApiContext";
import { getNotesForFolder } from "../notes-helpers";
import "./NoteListMain.css";
import PropTypes from 'prop-types';

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
    folderId: '',
    notes: [],
    tag: {},
    to: '',
    type: '',
    className: '',
    id: {},
    name: {},
    modified: {},
    icon: '',
  };
  static contextType = ApiContext;

  render() {
    const { folderId } = this.props.match.params;
    const { notes = [] } = this.context;
    const notesForFolder = getNotesForFolder(notes, folderId);
    return (
      <section className="NoteListMain">
          <div className="NoteListMain__button-container">
          <CircleButton
            tag={Link}
            to="/add-note"
            type="button"
            className="NoteListMain__add-note-button"
          >
            <FontAwesomeIcon icon="plus" />
            <br />
            Note
          </CircleButton>
        </div>
        <ul>
          {notesForFolder.map((note) => (
            <li key={note.id}>
              <Note id={note.id} name={note.name} modified={note.modified} />
            </li>
          ))}
        </ul>
          {/* button used to be here */}
      </section>
    );
  }
}

NoteListMain.propTypes = {
  match: PropTypes.shape({ params: PropTypes.object.isRequired }),
  folderId: PropTypes.string.isRequired,
  notes: PropTypes.array.isRequired,
  tag: PropTypes.object.isRequired,
  to: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  id: PropTypes.object.isRequired,
  name: PropTypes.object.isRequired,
  modified: PropTypes.object.isRequired,
  icon: PropTypes.string.isRequired,

};
