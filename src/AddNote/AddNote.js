import React, { Component } from "react"; 

//add note
// implements a form to capture the name, content, and folder for a new note
// submit to POST /notes endpoint on server
// add validation to ensure name of note is not left blank
// select folder from list of existing ones
// ensure errors are properly handled
// add button to note list page to invoke new form. 

export default class AddNote extends Component {
  render() {
    return (
      <form>
        <div>Note</div>
      </form>
    )
  }
}