import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store';
import Header from './Components/Header';
import TodoPage from './Pages/TodoPage';
import BlogPage from './Pages/BlogPage';
import NotFoundPage from './Pages/NotFoundPage';

import './App.css';
import 'antd/dist/antd.css';
import './Assets/Scss/common.scss'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header></Header>
          <div className="app-content">
            <Switch>
              <Route path="/" exact component={TodoPage}></Route>
              <Route path="/todo" component={TodoPage}></Route>
              <Route path="/blog" component={BlogPage}></Route>
              <Route component={NotFoundPage}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
