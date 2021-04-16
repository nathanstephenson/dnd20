import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';

import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
/*
const PORT = ':8080';
const HOST = '192.169.0.49';*/
//create apollo client
export const apolloClient = new ApolloClient({
  uri: '/graphql',//this is only the extension to the current url to send gql requests to
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