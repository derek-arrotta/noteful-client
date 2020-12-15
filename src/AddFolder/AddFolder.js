import React, { Component } from "react";
import NotefulForm from '../NotefulForm/NotefulForm'

//add folder
// capture name of new folder to POST /folders endpoint server (ensure any errors are handled)
// add a button to the navigation to invoke the new form
//
export default class AddFolder extends Component {
  
  

  render() {
    return (
      <section className="AddFolder">
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="folder-name-input">Name</label>
            <input type="text" id="folder-name-input" name="folder-name" />
          </div>
          <div className="buttons">
            <button type="submit">Add folder</button>
          </div>
        </NotefulForm>
      </section>
    );
  }

}
