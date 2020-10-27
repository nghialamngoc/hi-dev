import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './stores';
import Header from './components/Header';
import TodoPage from './pages/TodoPage';
import ArticlePage from './pages/ArticleRoot';
import NotFoundPage from './pages/NotFoundPage';

import './App.css';
import 'antd/dist/antd.css';
import "./scss/style.scss";

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
              <Route path="/articles" component={ArticlePage}></Route>
              <Route component={NotFoundPage}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
