import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';

import {ApolloClient, ApolloProvider, InMemoryCache, split, HttpLink} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities'
import {WebSocketLink} from '@apollo/client/link/ws'

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:8080/graphql',
  options: {reconnect:true}
})

const httpLink = new HttpLink({
  uri: 'http://localhost:8080/graphql'
});

const splitLink = split(({query})=>{
  const definition = getMainDefinition(query)
  return (
    definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  )
}, wsLink, httpLink)


//create apollo client
export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  },
});

ReactDOM.render(
  <ApolloProvider client = {apolloClient}>
    <BrowserRouter>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/><App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);


/*
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();*/