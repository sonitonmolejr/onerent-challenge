import React, { Component } from 'react';
import {
  BrowserRouter,
  // Link,
  Route,
  Switch,
} from 'react-router-dom';

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
  // toIdValue,
} from 'react-apollo';

import Header from './components/Header';
import UserList from './components/UserList';
import PropertyList from './components/PropertyList';


const networkInterface = createNetworkInterface({ uri: 'http://localhost:4000/graphql' });
networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500);
  },
}]);

const client = new ApolloClient({
  networkInterface
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
        <div className='center w85'>
        <Header />
          <div className='ph3 pv1 background-gray'>
            <Switch>
              <Route exact path='/users' component={UserList}/>
              <Route exact path='/properties' component={PropertyList}/>
            </Switch>
          </div>
        </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
