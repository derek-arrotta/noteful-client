import React from "react";
import PropTypes from 'prop-types';

export default React.createContext({
  notes: [],
  folders: [],
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
});

React.propTypes = {
  notes: PropTypes.array.isRequired,
  folders: PropTypes.array.isRequired,
  addFolder: PropTypes.func.isRequired,
  addNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
}