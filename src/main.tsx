// import { StrictMode } from 'react'
import { store } from './store/store';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.js';
import './index.css';

const rootElem = document.getElementById('root');

if (rootElem) {
  const root = createRoot(rootElem);

  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}
