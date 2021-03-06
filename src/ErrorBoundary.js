import React, { Component } from "react";
import PropTypes from 'prop-types';

export default class ErrorBoundary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static defaultProps = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {      
      return (
        <h2>an error has ocurred. please try refreshing page to continue</h2>
      );
    }
    return this.props.children;
  } 

}

ErrorBoundary.propTypes = {
  hasError: PropTypes.bool.isRequired,
};