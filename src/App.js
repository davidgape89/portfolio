import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Portfolio from './pages/portfolio/Portfolio';

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="content">
          <Router>
            <Header />
            <Route path="/" exact component={Home} />
            <Route path="/about-me" component={Portfolio} />
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
