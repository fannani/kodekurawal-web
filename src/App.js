import React, { lazy, Suspense } from 'react';
import * as Sentry from '@sentry/browser';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloProvider } from 'react-apollo';
import LoadingScreen from './components/UI/LoadingScreen';
import { API_URL } from './config/config';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/ErrorBoundary';

const AdminApp = lazy(() => import('./components/admin/App'));
const SiswaApp = lazy(() => import('./components/siswa/App'));
const WebLanding = lazy(() => import('./pages/web/Landing'));

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new createUploadLink({
      uri: API_URL,
    }),
  ]),
  cache: new InMemoryCache(),
});
if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: 'https://ac3a618606d44849bc830255efa393ff@sentry.io/1442748',
    environment: process.env.MODE,
  });
}

const getUserConfirmation = (dialogKey, callback) => {
  const dialogTrigger = window[Symbol.for(dialogKey)];
  if (dialogTrigger) return dialogTrigger(callback);
  callback(true);
};

function App() {
  return (
    <ApolloProvider client={client}>
    <BrowserRouter getUserConfirmation={getUserConfirmation}>
      <Suspense fallback={<LoadingScreen />}>
        <ErrorBoundary>
          <Switch>
            <Route path="/(|tentang|pelajari)" exact component={WebLanding} />
            <Route path="/admin" component={AdminApp} />
            <Route path="/" component={SiswaApp} />
          </Switch>
        </ErrorBoundary>
        <ToastContainer />
      </Suspense>
    </BrowserRouter>
  </ApolloProvider>
  );
}

export default App;
