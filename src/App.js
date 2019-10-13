import React from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Admin from './pages/admin/Admin';
import Portfolio from './pages/portfolio/Portfolio';
import {AuthContextProvider} from './contexts/auth/AuthContext';

import './App.scss';

// TODO - Include credit to the author of the favicon
// <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
const App = () => {
  return (
    <div className="App">
      <AuthContextProvider>
        <div className="content">
          <Router>
            <Header />
            <Route path="/" exact component={Home} />
            <Route path="/about-me" component={Portfolio} />
            <Route path="/admin" component={Admin} />
          </Router>
        </div>
      </AuthContextProvider>
    </div>
  );
};

export default App;
