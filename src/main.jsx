import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const link = document.createElement('link');
link.rel = 'icon';
link.type = 'image/x-icon';
link.href = '/favicon.ico';
document.head.appendChild(link);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
