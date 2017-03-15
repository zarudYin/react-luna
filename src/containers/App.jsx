import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';

const Json = require('./home/config.json');
console.log(Json);

//component
import Home from './home/Home';
//store
import UserStore from '../stores/userStore';

const user = new UserStore();

export default class APP extends Component {

  render() {
    console.log('APP render');
    return (
      <Provider
        user={user}
      >
        <HashRouter>
          <Route exact path="/" component={Home} />
        </HashRouter>
      </Provider>
    )
  }
}


