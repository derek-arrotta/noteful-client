import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleButton from "../CircleButton/CircleButton";
import ApiContext from "../ApiContext";
import { findNote, findFolder } from "../notes-helpers";
import "./NotePageNav.css";
import PropTypes from 'prop-types';

export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => {},
    },
    match: {
      params: {},
    },
  };
  static contextType = ApiContext;

  render() {
    const { notes, folders } = this.context;
    const { noteId } = this.props.match.params;
    const { goBack } = this.props.history;
    const note = findNote(notes, noteId) || {};
    const folder = findFolder(folders, note.folderId);
    return (
      <div className="NotePageNav">
        <CircleButton
          tag="button"
          role="link"
          //onClick={() => this.props.history.goBack()}
          onClick={() => goBack()}
          className="NotePageNav__back-button"
        >
          <FontAwesomeIcon icon="chevron-left" />
          <br />
          Back
        </CircleButton>
        {folder && <h3 className="NotePageNav__folder-name">{folder.name}</h3>}
      </div>
    );
  }
}

NotePageNav.propTypes = {
  notes: PropTypes.array.isRequired,
  folders: PropTypes.array.isRequired,
  noteId: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
  history: PropTypes.shape({goBack: PropTypes.func.isRequired}),
  match: PropTypes.shape({ params: PropTypes.object.isRequired }),
  tag: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
