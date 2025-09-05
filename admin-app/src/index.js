import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from './components/i18n';
import App from './App';
import { Provider } from 'react-redux';

import { store } from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
<Provider store={store}>

<I18nextProvider i18n={i18n}>
     <App />
</I18nextProvider>
</Provider>

  // </React.StrictMode>
);
