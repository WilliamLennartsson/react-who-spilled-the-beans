import React from 'react';
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import reducers from './src/reducers'

import MainScreen from './src/Screens/MainScreen'

export default class App extends React.Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

    return (
      <Provider store={store}>
        <MainScreen />
      </Provider>
    );
  }
}
