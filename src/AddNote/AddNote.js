import React, { Component } from "react";
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddNote.css'
import PropTypes from 'prop-types';

export default class AddNote extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
    name: '',
    content: 0,
    folderId: '',
    modified: '',
    newNote: {},
  };
  static contextType = ApiContext;

  handleSubmit = (e) => {
    e.preventDefault();
    const { push } = this.props.history;
    const { addNote } = this.context;
    const name = e.target["note-name"].value;
    const content = e.target["note-content"].value;
    const folderId = e.target["note-folder-id"].value;
    const modified = new Date();
    const newNote = {
      name,
      content,
      folderId,
      modified,
    };
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((note) => {
        addNote(note);
        //this.context.addNote(note);
        push(`/folder/${note.folderId}`);
        //this.props.history.push(`/folder/${note.folderId}`);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    const { folders = [] } = this.context;
    return (
      <section className="AddNote">
        <h2>Create a note</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="note-name-input">Name</label>
            <input type="text" id="note-name-input" name="note-name" required/>
          </div>
          <div className="field">
            <label htmlFor="note-content-input">Content</label>
            <textarea id="note-content-input" name="note-content" />
          </div>
          <div className="field">
            <label htmlFor="note-folder-select">Folder</label>
            <select id="note-folder-select" name="note-folder-id" required>
              {/*<option value={null}>...</option>*/}
              <option></option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id} required>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>
          <div className="buttons">
            <button type="submit">Add note</button>
          </div>
        </NotefulForm>
      </section>
    );
  }
}

AddNote.propTypes = {
  push: PropTypes.func,
  addNote: PropTypes.func,
  folders: PropTypes.array,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
  content: PropTypes.string.isRequired,
};