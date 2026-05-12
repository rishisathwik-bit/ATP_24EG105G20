import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ContextProvider from './contexts/contextProvider.jsx'; // ✅ fixed

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* add context provider at root level */}
    <ContextProvider> {/* ✅ fixed */}
      <App />
    </ContextProvider>
  </StrictMode>
);