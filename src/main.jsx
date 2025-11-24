import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css';
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import StripeProvider from './components/stripe/StripeProvider.jsx';
import './App.css';
import { initMercadoPago } from '@mercadopago/sdk-react';
import './i18n';

initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, { locale: 'es-AR' })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <StripeProvider>
        <App />
      </StripeProvider>
    </Provider>
  </StrictMode>,
)
