import React, { Component } from 'react';
import Home from './components/pages/Home';
import About from './components/pages/About';
import { BrowserRouter, Route } from 'react-router-dom';
import Header  from './components/Header';

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <div>
          <Header />

          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
