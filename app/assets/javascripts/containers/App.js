import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';
import { VisibilityFilters, addTodo, completeTodo, setVisibilityFilter } from '../actions';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todoApp from '../reducers';

const filters = [];
for ( let key in VisibilityFilters ) {
  filters.push(VisibilityFilters[key]);
}

function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
  }
}

@connect(state => {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  };
})
export default class App extends Component {
  render() {
    const { dispatch, visibleTodos, visibilityFilter } = this.props;
    return (
      <div>
        <AddTodo
          onAddClick={text => { dispatch(addTodo(text)); }} />
        <TodoList
          todos={visibleTodos}
          onTodoClick={index => { dispatch(completeTodo(index)); }} />
        <Footer 
          filter={visibilityFilter}
          onFilterChange={filter => { dispatch(setVisibilityFilter(filter)); }} />
      </div>
    );
  }
}
