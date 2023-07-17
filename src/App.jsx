import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './shared/Router';
import React from 'react';

const qeuryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={qeuryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
