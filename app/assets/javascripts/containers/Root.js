import { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import todoApp from '../reducers';
import App from './App';

const store = applyMiddleware(
  thunk
)(createStore)(todoApp);

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App presetTodos={this.props.presetTodos} />
      </Provider>
    );
  }
}
