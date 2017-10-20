import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo';

import Header from './components/Header';
import UserList from './components/UserList';
import PropertyList from './components/PropertyList';
import Search from './components/Search';

const networkInterface = createNetworkInterface({ uri: 'http://localhost:4000/graphql' });
networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500);
  },
}]);

import { IntrospectionFragmentMatcher } from 'apollo-client';
import introspectionQueryResultData from '../../fragmentTypes.json';
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const client = new ApolloClient({
  fragmentMatcher,
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
              <Route exact path='/search' component={Search}/>
            </Switch>
          </div>
        </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
