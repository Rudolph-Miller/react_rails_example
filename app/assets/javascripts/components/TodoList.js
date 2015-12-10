import React, { Component, PropTypes } from 'react';
import Todo from './Todo';

export default class TodoList extends Component {
  render() {
    let todos = this.props.todos.map((todo, index) =>
      <Todo
        {...todo}
        key={index}
        onAdded={() => { this.props.onTodoAdded(index, todo); }}
        onClick={() => { this.props.onTodoClick(index); }} />
    );

    return (
      <ul>
        {todos}
      </ul>
    );
  }
}

TodoList.propTypes = {
  onTodoAdded: PropTypes.func.isRequired,
  onTodoClick: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired
};
