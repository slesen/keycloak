import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import keycloak from './keycloak';
import './index.css';

keycloak.init({
  onLoad: 'login-required',
  pkceMethod: 'S256',
  checkLoginIframe: false,
}).then((authenticated) => {
  if (authenticated) {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  }
}).catch((error) => {
  console.error('Keycloak initialization failed:', error);
  document.getElementById('root')!.innerHTML =
    '<p>Kunde inte ansluta till inloggningen.</p>';
});
