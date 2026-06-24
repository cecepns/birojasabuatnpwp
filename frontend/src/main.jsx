import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      registration.update();

      // Clear stale caches from previous SW versions
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(
          keys.filter((key) => key.startsWith('birojasanpwp-') && key !== 'birojasanpwp-v2').map((key) =>
            caches.delete(key)
          )
        );
      }
    } catch {
      // SW optional — app works without it
    }
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
