import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PrivacyProvider } from './context/PrivacyContext';
import './i18n';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <PrivacyProvider>
        <App />
      </PrivacyProvider>
    </BrowserRouter>
  </StrictMode>
);
