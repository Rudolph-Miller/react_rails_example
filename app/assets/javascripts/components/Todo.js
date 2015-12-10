import React, { Component, PropTypes } from 'react';

export default class Todo extends Component {
  componentDidMount() {
    if (!(this.props.isSaved || this.props.isSaving))
      this.props.onAdded();
  }

  componentDidUpdate() {
    if (!(this.props.isSaved || this.props.isSaving))
      this.props.onUpdated();
  }

  render() {
    let status = 'Not saved...';
    if (this.props.isSaved) {
      status = "Saved!";
    } else if (this.props.isSaving) {
      status = "Saving!";
    }

    return(
      <li
        onClick={this.props.onClick}
        style={{
          textDecoration: this.props.completed ? 'line-through' : 'none',
          cursor: this.props.completed ? 'default' : 'pointer'
        }} >
        {this.props.id ? this.props.id : '@'}
        {'. '}
        {this.props.text}
        {' '}
        {status}
      </li>
    );
  }
}

Todo.propTypes = {
  onAdded: PropTypes.func.isRequired,
  onUpdated: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.number,
  text: PropTypes.string.isRequired,
  isSaved: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired
};
