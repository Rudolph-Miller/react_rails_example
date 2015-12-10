import { VisibilityFilters } from '../actions';
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, SAVE_TODO } from '../actions/actionTypes';

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
      return Object.assign({}, todo, {
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
    case COMPLETE_TODO: {
      return [
        ...todos.slice(0, action.index),
        Object.assign({}, todos[action.index], {
          isSaved: false,
          isSaved: false,
          completed: true
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
