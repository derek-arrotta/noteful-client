//define imports
import React, { Component } from "react"; // define react component "App"
import { Route, Link } from "react-router-dom"; // use route and link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // import icons
import NoteListNav from "../NoteListNav/NoteListNav"; // components/functions
import NotePageNav from "../NotePageNav/NotePageNav"; // ''
import NoteListMain from "../NoteListMain/NoteListMain"; // ''
import NotePageMain from "../NotePageMain/NotePageMain"; // ''
//import dummyStore from "../dummy-store"; // folders and notes source
//import { getNotesForFolder, findNote, findFolder } from "../notes-helpers"; // ''
import "./App.css"; // styling
// ----- added import ----------
import ApiContext from "../ApiContext";
import config from "../config";
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import PropTypes from 'prop-types';


export default class App extends Component {
  
  state = {
    notes: [],
    folders: [],
  };

  static defaultProps = {
    notes: [],
    folders: [],
    folder: '',
    note: '',
    noteId: '',
    component: {},
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`),
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then((e) => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then((e) => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  handleAddFolder = (folder) => {
    this.setState({
      folders: [...this.state.folders, folder],
    });
  };

  handleAddNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note],
    });
  };

  handleDeleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== noteId),
    });
  };

  // "..." spread attribute
  renderNavRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route path="/note/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <Route path="/note/:noteId" component={NotePageMain} />
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />
      </>
    );
  }

  render() {
    //throw "error";
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote,
    };
    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{" "}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </ApiContext.Provider>
    );
  }
}

App.propTypes = {
  notes: PropTypes.array.isRequired,
  folders: PropTypes.array.isRequired,
  folder: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  noteId: PropTypes.string.isRequired,
  addFolder: PropTypes.func,
  addNote: PropTypes.func,
  deleteNote: PropTypes.func,
  path: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
  key: PropTypes.object,
  component: PropTypes.object.isRequired,
};