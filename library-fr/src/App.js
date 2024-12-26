import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Book from './components/Book';
import User from './components/User';
import Borrow from './components/Borrow';
import Report from './components/Report';



function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/book" component={Book} />
          <Route path="/user" component={User} />
          <Route path="/borrow" component={Borrow} />
          <Route path="/report" component={Report} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
