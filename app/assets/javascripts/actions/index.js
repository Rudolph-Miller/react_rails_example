import {
  ADD_TODO, COMPLETE_TODO,
  SET_VISIBILITY_FILTER,
  SAVE_TODO, UPDATE_TODO
} from './actionTypes';
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

function requestSaveTodo(index) {
  return { type: SAVE_TODO, index };
}

function receiveSavedTodo(index, todo) {
  return { type: SAVE_TODO, status: 'OK', index, todo}
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
      return response.json();
    }).then(json => {
      dispatch(receiveSavedTodo(index, json.todo));
    });
  };
}

function requestUpdateTodo(index) {
  return { type: UPDATE_TODO, inedx }
}

function receiveUpdatedTodo(index) {
  return { type: UPDATE_TODO, status: 'OK', index }
}

export function updateTodo(index, todo) {
  return dispatch => {
    dispatch(requestUpdateTodo(index));
    return fetch('/todos/' + todo.id,{
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        todo: {
          id: todo.id,
          text: todo.text,
          completed: todo.completed
        }
      })
    }).then(response => {
      response.json();
    }).then(json => {
      dispatch(receiveUpdatedTodo(index));
    });
  };
}
