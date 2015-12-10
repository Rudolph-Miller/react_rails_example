import { VisibilityFilters } from '../actions';
import {
  ADD_TODO, TOGGLE_TODO_COMPLETION,
  SET_VISIBILITY_FILTER, SAVE_TODO,
  UPDATE_TODO, FETCH_TODOS, SET_TODOS
} from '../actions/actionTypes';

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
};

function visibilityFilter(state = VisibilityFilters.SHOW_ALL, action = {}) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

function saveTodo(todo, action) {
  switch (action.status) {
    case 'OK': {
      return Object.assign({}, todo, action.todo, {
        isSaved: true,
        isSaving: false
      });
    }
    default: {
      return Object.assign({}, todo, {
        isSaving: true
      });
    }
  }
}

function updateTodo(todo, action) {
  switch (action.status) {
    case 'OK': {
      return Object.assign({}, todo, action.todo, {
        isSaved: true,
        isSaving: false
      });
    }
    default: {
      return Object.assign({}, todo, {
        isSaving: true
      });
    }
  }
}

function fetchTodo(todos, action) {
  switch (action.status) {
    case 'OK': {
      return action.todos.map(todo => {
        return Object.assign({}, todo, {
          isSaved: true,
          isSaving: false
        });
      });
    }
    default: {
      return todos;
    }
  }
}

function todos(todos = [], action = {}) {
  switch (action.type) {
    case ADD_TODO: {
      if (action.text) {
        return [
          ...todos,
          {
            text: action.text,
            isSaved: false,
            isSaving: false,
            completed: false
          }
        ];
      } else {
        return todos;
      }
    }
    case TOGGLE_TODO_COMPLETION: {
      const todo = todos[action.index];
      return [
        ...todos.slice(0, action.index),
        Object.assign({}, todo , {
          isSaved: false,
          isSaved: false,
          completed: todo.completed ? false : true
        }),
        ...todos.slice(action.index + 1)
      ];
    }
    case SAVE_TODO: {
      return [
        ...todos.slice(0, action.index),
        saveTodo(todos[action.index], action),
        ...todos.slice(action.index + 1)
      ];
    }
    case UPDATE_TODO: {
      return [
        ...todos.slice(0, action.index),
        updateTodo(todos[action.index], action),
        ...todos.slice(action.index + 1)
      ];
    }
    case FETCH_TODOS: {
      return fetchTodo(todos, action);
    }
    case SET_TODOS: {
      return action.todos.map(todo => {
        return Object.assign({}, todo, {
          isSaved: true,
          isSaving: false
        });
      });
    }
    default:
      return todos;
  }
}

export default function todoApp(state = initialState, action = {}) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  };
}
