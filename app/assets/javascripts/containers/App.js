import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';
import {
  VisibilityFilters, addTodo, toggleTodoCompletion,
  setVisibilityFilter, saveTodo, updateTodo,
  fetchTodos, setTodos
} from '../actions';
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
  componentDidMount() {
    const { dispatch, presetTodos } = this.props;
    if (presetTodos) {
      dispatch(setTodos(presetTodos));
    } else {
      dispatch(fetchTodos());
    }
  }

  render() {
    const { dispatch, visibleTodos, visibilityFilter } = this.props;
    return (
      <div>
        <AddTodo
          onAddClick={text => { dispatch(addTodo(text)); }} />
        <TodoList
          todos={visibleTodos}
          onTodoAdded={(index, todo) => { dispatch(saveTodo(index, todo)); }}
          onTodoUpdated={(index, todo) => { dispatch(updateTodo(index, todo)); }}
          onTodoClick={index => { dispatch(toggleTodoCompletion(index)); }} />
        <Footer 
          filter={visibilityFilter}
          onFilterChange={filter => { dispatch(setVisibilityFilter(filter)); }} />
      </div>
    );
  }
}
