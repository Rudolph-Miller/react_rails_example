import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, SAVE_TODO } from './actionTypes';
import fetch from 'isomorphic-fetch';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export function addTodo(text) {
  return { type: ADD_TODO, text };
}

export function completeTodo(index) {
  return { type: COMPLETE_TODO, index };
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}

export function requestSaveTodo(index) {
  return { type: SAVE_TODO, index };
}

export function receiveSavedTodo(index) {
  return { type: SAVE_TODO, status: 'OK', index }
}

export function saveTodo(index, todo) {
  return dispatch => {
    dispatch(requestSaveTodo(index));
    return fetch('/todos', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        todo: {
          text: todo.text
        }
      })
    }).then(response => {
      response.json();
    }).then(json => {
      dispatch(receiveSavedTodo(index));
    });
  };
}
