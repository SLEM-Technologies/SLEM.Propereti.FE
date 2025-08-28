import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Providers from './app/Providers.tsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Providers>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Providers>
    </BrowserRouter>
  </React.StrictMode>
);
